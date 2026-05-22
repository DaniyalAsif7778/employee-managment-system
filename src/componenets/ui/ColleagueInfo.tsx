import React from "react";
import Avatar from "./Avatar.js";
import Button from "./Button.js";
import { Mail, MapPin, Phone } from "lucide-react";
const ColleagueInfo = () => {
  return (
    <>
      <div className="    bg-surface rounded-md border   ">
        <div className="p-6 ">
          <div className="w-full rounded-md p-3 flex flex-row gap-3 items-start hover:bg-[#1F1F1F] ">
            <div>
              {/* {Avatar} */}
              <Avatar color={{ red: 122, green: 122, blue: 122 }} text={"SJ"} />
            </div>
            <div>
              <h4 className="text-text-primary font-semibold">Alex Martinez</h4>
              <h5 className="text-text-secondary ">Senior Accountant</h5>
              <Button
                text="Finance"
                className="text-md w-25 h-9 bg-blue-100 text-info rounded-lg mt-3 hover:text-text-primary "
              />
            </div>
          </div>
          <div className="border-t"></div>
          <div className="m-3">
            <h5 className="text-text-secondary flex gap-2 items-center ">
              <Mail className="w-4 h-4" />
              sarah.j@company.com
            </h5>
            <h5 className="text-text-secondary flex gap-2 items-center ">
              <Phone className="w-4 h-4" />
              +1 (555) 234-5678
            </h5>
            <h5 className="text-text-secondary flex gap-2 items-center ">
              <MapPin className="w-4 h-4" />
              San Francisco, CA
            </h5>
          </div>
          <div className="border-t"></div>
           <div className="m-3 flex gap-3">
              <Button
                text="Message"
                className="text-md w-full h-12 bg-primary text-info rounded-lg text-text-primary "
              />
              <div className="bg-navbar w-16 h-12 rounded-lg flex items-center justify-center">
                 <Mail className="w-6 h-6" />
              </div>
              
           </div>
        </div>
      </div>
    </>
  );
};

export default ColleagueInfo;
