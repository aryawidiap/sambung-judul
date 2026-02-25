import { useContext } from "react";
import { songKeywords } from "../_utils/content"
import LanguageContext from "../_context/LanguageContext";

export default function PreviousSongKeywords({ show, keywords }: { show: boolean, keywords: Array<{ term: string, foundInTitle: boolean }> }) {
    const {header: headerContent, placeholder: placeholderContent } = songKeywords;
    const language = useContext(LanguageContext);

    if (show) {
        return (
            <div className="flex flex-row gap-2 mt-3 text-xs">
                {headerContent[language]}:
                <ul className="flex flex-row gap-1">
                    {
                        keywords.map((keyword, index) =>
                            <li key={index} className={"font-semibold " + (keyword.foundInTitle ? "text-white" : "text-white/50")}>
                                {keyword.term + (index === keywords.length - 1 ? "" : ",")}
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }

    return (
        <div className="flex flex-row gap-1 mt-3 text-xs text-white/50">
            {headerContent[language]}:
            <span className={"font-semibold"}>{placeholderContent[language]}</span>
        </div>
    )

}