export const PostBoxImgByTime = () => {
    const rootPath = "/img/postbox/postbox-";
    const date = new Date();
    const hour = date.getHours();
    if (12 <= hour && hour < 18) {
      return rootPath + "afternoon.svg";
    } else if (0 <= hour && hour <= 6) {
      return rootPath + "night.svg";
    } else {
      return rootPath + "dawn.svg";
    }
  };