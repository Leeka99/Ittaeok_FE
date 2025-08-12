import Image from "next/image";
import google from "@/assets/icon/google_login_icon.svg";

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <button
      className=" w-full bg-[color:var(--color-white)] h-11 rounded-sm flex justify-center items-center gap-2 font-semibold  cursor-pointer max-w-[700px] border border-[#DADFE660]"
      style={{ boxShadow: "var(--shadow-common)" }}
      onClick={handleLogin}
    >
      <Image width={18} height={18} src={google} alt="" />
      구글 로그인
    </button>
  );
};
export default GoogleLoginButton;
