import AccountLayout from "../../layouts/AccountLayout.tsx";
import { Link } from "react-router-dom";
import useUserState from "../../hooks/useUserState.ts";
import { useGetUserTelegramToken } from "../../../src/api/endpoints/account/accountTelegram/accountTelegram.ts";
import { Spinner } from "@chakra-ui/react";

function TelegramPage() {
  const user = useUserState();
  const { data, isPending, isSuccess } = useGetUserTelegramToken(user.id);

  return (
    <AccountLayout>
      <Link to="/telegram">Telegram</Link>
      <div className="grid grid-cols-1 gap-4">
        {isPending && <Spinner/>}
        {isSuccess && <div>{data.data.token}</div>}
      </div>
    </AccountLayout>
  );
}

export default TelegramPage;
