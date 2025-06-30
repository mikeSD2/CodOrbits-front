"use client";

import { useEffect, useState } from "react";
import parse, {
    domToReact,
    Element,
    HTMLReactParserOptions,
    Text,
    DOMNode,
} from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { decode } from "html-entities";
import React from "react";

interface PostContentProps {
    content: string;
}

interface NavigatorWithLegacyLanguage extends Navigator {
    userLanguage?: string;
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
    const [isRussian, setIsRussian] = useState(true);

    // Шаг 2: адаптивный размер шрифта
    useEffect(() => {
        const handleResize = () => {
            setFontSize(window.innerWidth < 640 ? "0.70rem" : "1rem");
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const legacyNavigator =
            navigator as unknown as NavigatorWithLegacyLanguage;
        const userLang = (
            legacyNavigator.language || legacyNavigator.userLanguage
        )?.toLowerCase();
        if (userLang) {
            const langCode = userLang.split("-")[0];
            const excludedLangs = [
                "ru", // Russian
                "uk", // Ukrainian
                "be", // Belarusian
                "uz", // Uzbek
                "kk", // Kazakh
                "ka", // Georgian
                "az", // Azerbaijani
                "lt", // Lithuanian
                "ro", // Romanian / Moldovan
                "lv", // Latvian
                "ky", // Kyrgyz
                "tg", // Tajik
                "hy", // Armenian
                "tk", // Turkmen
                "et", // Estonian
            ];
            if (!excludedLangs.includes(langCode)) {
                setIsRussian(false);
            }
        }
    }, []);

    // Шаг 3: Парсинг HTML с заменой на компоненты
    const parserOptions: HTMLReactParserOptions = {
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
                                PreTag={({ children, ...props }) => {
                                    if (
                                        !isRussian &&
                                        React.isValidElement(children) &&
                                        children.type === "code"
                                    ) {
                                        // Явно приводим тип, чтобы TypeScript был уверен в структуре props.
                                        const element =
                                            children as React.ReactElement<{
                                                children: React.ReactNode;
                                                [key: string]: unknown;
                                            }>;

                                        const {
                                            children: codeChildren,
                                            ...restProps
                                        } = element.props;

                                        return (
                                            <pre {...props}>
                                                {React.createElement(
                                                    "span",
                                                    restProps,
                                                    codeChildren
                                                )}
                                            </pre>
                                        );
                                    }
                                    return <pre {...props}>{children}</pre>;
                                }}
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

            if (
                domNode instanceof Element &&
                domNode.name === "code" &&
                !isRussian
            ) {
                const props: { [key: string]: string } = { ...domNode.attribs };
                if (props.translate) {
                    delete props.translate;
                }

                props.className = `${
                    props.className || ""
                } font-[family-name:var(--font-jura)] bg-gray-100 py-0.5 px-1 rounded-md`;

                return (
                    <span {...props}>
                        {domToReact(
                            domNode.children as DOMNode[],
                            parserOptions
                        )}
                    </span>
                );
            }
        },
    };

    const parsedContent = parse(preprocessHTML(content), parserOptions);

    return <div className="wp-content space-y-4">{parsedContent}</div>;
}
/*чат у меня вместо System.out.println(a) ; вот такое "System . out . println ( a ) ;". гугл вставляет пробелы. Пожалуйста поудаляй в примерах кода до точки и после точки пробел, все остально не слишком важно. вот как это в браузере выглядит "<span class="language-java" style="color: black; background: none; text-shadow: white 0px 1px; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.5; tab-size: 4; hyphens: none;"><span class="linenumber react-syntax-highlighter-line-number" style="display: inline-block; min-width: 3.25em; padding-right: 1em; text-align: right; user-select: none; color: slategray;"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">1</font></font></span><span class="token" style="color: rgb(0, 119, 170);"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">class </font></font></span><font style="vertical-align: inherit;"><span class="token" style="color: rgb(221, 74, 104);"><font style="vertical-align: inherit;">test</font></span></font><span> </span><span class="token" style="color: rgb(221, 74, 104);"><font style="vertical-align: inherit;"></font></span><span>
</span><span class="linenumber react-syntax-highlighter-line-number" style="display: inline-block; min-width: 3.25em; padding-right: 1em; text-align: right; user-select: none; color: slategray;"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">2</font></font></span><span></span><span class="token" style="color: rgb(153, 153, 153);"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{</font></font></span><span>
</span><span class="linenumber react-syntax-highlighter-line-number" style="display: inline-block; min-width: 3.25em; padding-right: 1em; text-align: right; user-select: none; color: slategray;"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">3</font></font></span><span>    </span><span class="token" style="color: rgb(0, 119, 170);"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">public </font></font></span><font style="vertical-align: inherit;"><span class="token" style="color: rgb(0, 119, 170);"><font style="vertical-align: inherit;">static </font></span><span class="token" style="color: rgb(0, 119, 170);"><font style="vertical-align: inherit;">void </font></span><span class="token" style="color: rgb(221, 74, 104);"><font style="vertical-align: inherit;">main </font></span><span class="token" style="color: rgb(153, 153, 153);"><font style="vertical-align: inherit;">( </font></span><span class="token" style="color: rgb(221, 74, 104);"><font style="vertical-align: inherit;">String </font></span><span class="token" style="color: rgb(153, 153, 153);"><font style="vertical-align: inherit;">[ </font></span><span class="token" style="color: rgb(153, 153, 153);"><font style="vertical-align: inherit;">] </font></span><span><font style="vertical-align: inherit;">args </font></span><span class="token" style="color: rgb(153, 153, 153);"><font style="vertical-align: inherit;">)</font></span></font><span> </span><span class="token" style="color: rgb(0, 119, 170);"><font style="vertical-align: inherit;"></font></span><span> </span><span class="token" style="color: rgb(0, 119, 170);"><font style="vertical-align: inherit;"></font></span><span> </span><span class="token" style="color: rgb(221, 74, 104);"><font style="vertical-align: inherit;"></font></span><span class="token" style="color: rgb(153, 153, 153);"><font style="vertical-align: inherit;"></font></span><span class="token" style="color: rgb(221, 74, 104);"><font style="vertical-align: inherit;"></font></span><span> </span><span class="token" style="color: rgb(153, 153, 153);"><font style="vertical-align: inherit;"></font></span><span class="token" style="color: rgb(153, 153, 153);"><font style="vertical-align: inherit;"></font></span><span><font style="vertical-align: inherit;"></font></span><span class="token" style="color: rgb(153, 153, 153);"><font style="vertical-align: inherit;"></font></span><span>" но учитывай что нужно дождаться когда google переводчик переведет страницу а только потом удалять пробелы*/
