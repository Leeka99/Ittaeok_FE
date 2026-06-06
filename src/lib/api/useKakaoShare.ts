export const useKakaoShare = () => {
  const shareWithTemplate = (description: string, url = "") => {
    window.Kakao.Share.sendCustom({
      templateId: 134037,
      templateArgs: {
        description,
        url,
      },
    });
  };

  return { shareWithTemplate };
};
