export const useKakaoShare = () => {
  const shareWithTemplate = (description: string, url = "") => {
    window.Kakao.Share.sendCustom({
      templateId: 1282534,
      templateArgs: {
        description,
        url,
      },
    });
  };

  return { shareWithTemplate };
};
