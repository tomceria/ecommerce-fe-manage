export const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

export const handleOnClearBasic = (formFuncs, model) => {
  Object.keys(formFuncs.getValues()).forEach(fieldName => {
    const targetModelField = model.find(modelField => modelField.name === fieldName);
    const finalFieldName = targetModelField ? targetModelField.name : fieldName;
    formFuncs.setValue(finalFieldName, (targetModelField && targetModelField.defaultValue) || "");
  });
  formFuncs.clearError();
};

export default { scrollToRef };
