"use client";

import { useEffect, useState } from "react";
import { sanitizeHtml } from "@/lib/sanitize";

interface SanitizedContentProps {
    html: string;
}

export default function SanitizedContent({ html }: SanitizedContentProps) {
    const [sanitizedHtml, setSanitizedHtml] = useState("");

    // Санитизируем HTML только на клиенте
    useEffect(() => {
        setSanitizedHtml(sanitizeHtml(html));
    }, [html]);

    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
