import {GrNext, GrPrevious} from "react-icons/gr";


export default function Pagination({links = []}) {
    const previousLink = links[0]
    const nextLink = links[links.length - 1]

    const pageLinks = links.filter((f, i) => {
        return i !== 0 && i !== (links.length - 1)
    })

    return (
        <div className="flex justify-center">
            <div className="gap-2 pagination py-3">
                {
                    links.length > 0 ?
                        (
                            <>
                                <a href={previousLink.url} className={`direction text-gray-100 ${previousLink.url ?? 'disabled'}`}>
                                    <GrPrevious/>
                                </a>
                                {
                                    pageLinks.map((item, i) => {
                                        return (
                                            <a href={item.url} key={i}
                                               className={`page ${item.active ? 'active' : ''}`}>{item.label}</a>
                                        )
                                    })
                                }
                                <a href={nextLink.url} className={`direction text-gray-100 ${nextLink.url ?? 'disabled'}`}>
                                    <GrNext/>
                                </a>
                            </>
                        ) : ('')
                }
            </div>
        </div>
    )
}
