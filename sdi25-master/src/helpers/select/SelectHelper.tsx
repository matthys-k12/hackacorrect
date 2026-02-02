export const getOptionLabel = (list: any[], selectedOption: any) => {
  const foundOption = list.find(
    (option: { value: any; }) => option.value === selectedOption
  );
  return foundOption ? foundOption.label : null;
};

export const getOptionValue = (list: any[], selectedOption: any) => {
  const foundOption = list.find(
    (option: { label: any }) => option.label === selectedOption
  );
  return foundOption ? foundOption.value : null;
};
