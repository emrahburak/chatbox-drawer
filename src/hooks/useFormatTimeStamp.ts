import { useUIConfig } from "../context/UIConfigContext";

export const useFormatTimestamp = () => {
  const { locale } = useUIConfig();

  return (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
};
