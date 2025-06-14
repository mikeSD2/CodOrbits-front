"use client";

import { useEffect, useState } from "react";
import parse, { Element, Text } from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { decode } from "html-entities";

interface PostContentProps {
    content: string;
}

// Шаг 1: Препроцессинг — замена <SyntaxHighlighter> на безопасный тэг
const preprocessHTML = (html: string): string => {
    // Обрабатываем SyntaxHighlighter тэги, применяя замену кавычек и decode только к коду внутри
    const processedCode = html.replace(
        /<SyntaxHighlighter\s+language="([^"]+)"[^>]*>([\s\S]*?)<\/SyntaxHighlighter>/g,
        (_, lang, code) => {
            const decodedCode = decode(code);
            // Применяем замену типографских кавычек и decode только к коду
            const normalizedCode = decodedCode.replace(/[“”]/g, '"');

            return `<syntax-highlighter data-language="${lang}">${encodeURIComponent(
                normalizedCode
            )}</syntax-highlighter>`;
        }
    );

    return processedCode;
};

export default function PostContent({ content }: PostContentProps) {
    const [fontSize, setFontSize] = useState("0.875rem");

    // Шаг 2: адаптивный размер шрифта
    useEffect(() => {
        const handleResize = () => {
            setFontSize(window.innerWidth < 640 ? "0.70rem" : "1rem");
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Шаг 3: Парсинг HTML с заменой на компоненты
    const parsedContent = parse(preprocessHTML(content), {
        replace: (domNode) => {
            if (
                domNode instanceof Element &&
                domNode.name === "syntax-highlighter"
            ) {
                const language = domNode.attribs["data-language"] || "text";
                const rawCode = decodeURIComponent(
                    (domNode.children?.[0] as Text)?.data || ""
                );

                return (
                    <div className="relative p-[1px] pl-[5px] bg-gradient-to-r from-blue-500 to-blue-100 rounded-lg">
                        <div className="big-code-block bg-white rounded-lg">
                            <SyntaxHighlighter
                                language={language}
                                style={prism}
                                showLineNumbers
                                className="p-4 rounded-lg block w-full h-full"
                                customStyle={{
                                    fontSize,
                                    backgroundColor: "#fbfdff",
                                    margin: 0,
                                }}
                            >
                                {rawCode.trim()}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                );
            }
        },
    });

    return <div className="wp-content space-y-4">{parsedContent}</div>;
}
