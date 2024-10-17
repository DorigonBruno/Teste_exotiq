export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const month = date.toLocaleString("pt-BR", { month: "short" });
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};
