import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FC } from "react";

type ErrorMessageProps = {
  message?: string | null | FetchBaseQueryError | SerializedError;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  let formattedMessage: string | null = null;

  if (typeof message === 'string') {
    formattedMessage = message;
  } else if ('status' in message && 'data' in message) {
    formattedMessage = `Ошибка ${message.status}: ${JSON.stringify(message.data)}`;
  } else if ('message' in message) {
    formattedMessage = message.message || null;
  }

  if (!formattedMessage) return null;

  return <div className="text-error mt-2">{formattedMessage}</div>;
};

export default ErrorMessage;
