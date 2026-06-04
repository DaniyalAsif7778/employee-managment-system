import React from "react";
import Avatar from "./Avatar.js";
const RecentHiers = () => {
    return (
        <>
            <div className="    bg-surface rounded-md border   ">
                <div className=" flex  flex-col gap-0.5 p-5 border-b border-text-disabled">
                    <h2 className="font-semibold text-text-primary">Recent Hiers</h2>
                    <p className="text-sm">New team members</p>
                </div>
                <div className="p-5 ">
                    <div className="w-full rounded-md p-3 flex flex-row gap-3 items-start hover:bg-[#1F1F1F] ">
                        <div>
                            {/* {Avatar} */}
                            <Avatar color={{red:122, green:122,blue:122}} text={"A"}/>
                        </div>
                        <div>
                            <h4 className="text-text-primary font-semibold">Alex Martinez</h4>
                            <h5 className="text-text-secondary ">Software Engineer</h5>
                            <p className="text-text-disabled whitespace-nowrap">Engineering
                                •
                                Mar 28, 2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default RecentHiers