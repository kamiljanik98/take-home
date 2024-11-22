import { FC, useState} from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";

type CardProps = {
  title: ListItem["title"];
  description?: ListItem["description"];
  isVisible?: boolean;
  onCloseClick?: () => void;
  onExpandClick?: () => void;
  onToggleClick?: () => void;


};

export const Card: FC<CardProps> = ({ title, description, isVisible, onCloseClick, onExpandClick}) => {


  return (
    <div className={`border border-black px-2 py-1.5 ${isVisible ? "animate-fadeIn" : ""}`}>
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          {description ? (
            <ExpandButton onClick={onExpandClick}>  
              <ChevronUpIcon/>
            </ExpandButton>
            ) : null
          }
          <DeleteButton onClick={onCloseClick} />
        </div>
      </div>

      {isVisible ? (

        <p className="text-sm">{description}</p>
        ) : null
      }
    </div>
  );
};
