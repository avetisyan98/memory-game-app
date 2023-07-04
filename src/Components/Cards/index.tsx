import React, { FC } from "react";
import classnames from "classnames";
import "./style.scss";
import question from "../../images/question.png";
interface IProps {
  cardImg: string;
  isFlipped: boolean;
  isInactive: boolean;
  onClick: () => void;
}

export const Card: FC<IProps> = ({
  onClick,
  cardImg,
  isFlipped,
  isInactive,
}) => {
  const handleClick  = () => {
    !isFlipped && onClick();
  }
  return (
    <div
      className={classnames("cards", { "is-inactive": isInactive })}
      onClick={handleClick}
    >
      <div className={classnames("card-face card-font-face")}>
        <img src={cardImg} />
      </div>
      <div
        className={classnames("card-face card-back-face", {
          "is-flipped": isFlipped,
        })}
      >
        <img src={question} />
      </div>
    </div>
  );
};

export default Card;
