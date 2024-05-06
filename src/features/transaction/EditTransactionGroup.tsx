import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  InputGroup,
  Spinner,
  Button,
} from "@chakra-ui/react";
import * as yup from "yup";
import useTransactionEditDrawer from "../../stores/drawerStore";
import { useTranslation } from "react-i18next";
import { CategoryTransactionType } from "../../models/category.model.ts";
import { ITransactionRequest } from "../../models/transaction.model.ts";
import { useMutateWithFormik } from "../../hooks/useMutateWithFormik.ts";
import {
  useGetUserTransactionInfo,
  useUpdateUserTransaction,
} from "../../api/endpoints/transaction/transactions.api.ts";
import { Suspense } from "react";
import i18next from "../../tools/language/language.ts";
import AccountSelect from "../../widgets/selects/AccountSelect.tsx";
import CategorySelect from "../../widgets/selects/CategorySelect.tsx";
import CategoryTransactionTypeRadio from "../../widgets/radio/CategoryTransactionTypeRadio.tsx";

const validationSchema = yup.object({
  comment: yup.string().required(i18next.t("form.validation.required")),
  amount: yup.string().required(i18next.t("form.validation.required")),
  type: yup.string().required(i18next.t("form.validation.required")),
  account_id: yup.number().required(i18next.t("form.validation.required")),
  date: yup.date().required(i18next.t("form.validation.required")),
  categories_ids: yup
    .array()
    .required(i18next.t("form.validation.required"))
    .min(1),
});

const EditTransactionGroup = () => {
  const { isOpen, onClose, transactionId } = useTransactionEditDrawer();
  const transaction = useGetUserTransactionInfo(transactionId);
  const { t } = useTranslation();
  const handleChangeType = (nextValue: string) => {
    formik.values.categories_ids = [];
    formik.setFieldValue("type", nextValue);
  };
  const { formik, isPending } = useMutateWithFormik<ITransactionRequest>({
    mutation: useUpdateUserTransaction,
    initialValues: {
      account_id: transaction.data?.data.account_id ?? 0,
      comment: transaction.data?.data.comment ?? "",
      amount: transaction.data?.data.amount ?? 0,
      categories_ids:
        transaction.data?.data.categories.map((category) => category.id) ?? [],
      date: transaction.data?.data.date ?? "",
      type: transaction.data?.data.type ?? CategoryTransactionType.EXPENSE,
    },
    validationSchema: validationSchema,
    onSuccess: onClose,
    prepareSubmitData: (values) => {
      return {
        id: transactionId,
        data: values,
      };
    },
  });
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Edit Transaction Group</DrawerHeader>
            <DrawerBody>
              <form id="editTransactionForm" onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <FormControl
                    isInvalid={
                      formik.touched.comment && Boolean(formik.errors.comment)
                    }
                  >
                    <FormLabel htmlFor="comment">
                      {t("form.label.comment")}
                    </FormLabel>
                    <Input
                      placeholder={t("form.placeholder.comment")}
                      id="comment"
                      name="comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={
                      formik.touched.amount && Boolean(formik.errors.amount)
                    }
                  >
                    <FormLabel htmlFor="amount">
                      {t("form.label.amount")}
                    </FormLabel>
                    <Input
                      placeholder={t("form.placeholder.comment")}
                      id="amount"
                      name="amount"
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={
                      formik.touched.date && Boolean(formik.errors.date)
                    }
                  >
                    <FormLabel htmlFor="date">{t("form.label.date")}</FormLabel>
                    <InputGroup>
                      <Input
                        placeholder={t("form.placeholder.date")}
                        id="date"
                        name="date"
                        type="datetime-local"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={
                      formik.touched.account_id &&
                      Boolean(formik.errors.account_id)
                    }
                  >
                    <FormLabel htmlFor="account_id">
                      {t("form.label.account")}
                    </FormLabel>
                    <Suspense fallback={<Spinner />}>
                      <AccountSelect
                        id="account_id"
                        name="account_id"
                        defaultValue={formik.values.account_id}
                        onBlur={formik.handleBlur}
                        setFieldValue={formik.setFieldValue}
                      />
                    </Suspense>
                    <FormErrorMessage>
                      {formik.errors.account_id}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={
                      formik.touched.categories_ids &&
                      Boolean(formik.errors.categories_ids)
                    }
                  >
                    <FormLabel htmlFor="categories_ids">
                      {t("form.label.categories")}
                    </FormLabel>
                    <Suspense fallback={<Spinner />}>
                      <CategorySelect
                        type={formik.values.type}
                        values={formik.values.categories_ids}
                        id="categories_ids"
                        name="categories_ids"
                        onBlur={formik.handleBlur}
                        setFieldValue={formik.setFieldValue}
                      />
                    </Suspense>
                    <FormErrorMessage>
                      {formik.errors.categories_ids}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={
                      formik.touched.type && Boolean(formik.errors.type)
                    }
                  >
                    <FormLabel htmlFor="type">{t("form.label.type")}</FormLabel>
                    <CategoryTransactionTypeRadio
                      id="type"
                      name="type"
                      value={formik.values.type}
                      onChange={handleChangeType}
                      defaultValue={formik.values.type}
                    />
                    <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
                  </FormControl>
                </Stack>
              </form>
            </DrawerBody>
            <DrawerFooter>
              <Button
                isLoading={isPending}
                type="submit"
                form="editTransactionForm"
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default EditTransactionGroup;
