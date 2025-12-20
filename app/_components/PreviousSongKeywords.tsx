export default function PreviousSongKeywords({ show, keywords }: { show: boolean, keywords: Array<{ term: string, foundInTitle: boolean }> }) {
    if (show) {
        return (
            <div className="flex flex-row gap-2 mt-3 text-xs">
                Kata kunci:
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
            Kata kunci:
            <span className={"font-semibold"}>belum ada lagu sebelumnya ;D</span>
        </div>
    )

}