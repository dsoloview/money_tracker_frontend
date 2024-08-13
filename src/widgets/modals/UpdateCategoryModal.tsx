import {useTranslation} from "react-i18next";
import * as yup from "yup";
import i18next from '@/tools/language/language.ts';
import {CategoryTransactionType, ICategory, ICategoryRequest} from "@/models/category.model.ts";
import CategoryTransactionTypeRadio from "@/widgets/radio/CategoryTransactionTypeRadio.tsx";
import IconSelect from "@/widgets/selects/IconSelect.tsx";
import {useUpdateCategory} from "@/api/endpoints/category/category.api.ts";
import {useMutateWithForm} from "@/hooks/useMutateWithForm.ts";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/ui/dialog.tsx";
import {Button} from "@/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/ui/form.tsx";
import {Input} from "@/ui/input.tsx";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    category: ICategory;
}

const validationSchema = yup.object({
    name: yup.string()
        .required(i18next.t('form.validation.required')),
    type: yup.string()
        .required(i18next.t('form.validation.required')),
    description: yup.string(),
    icon_id: yup.number().nullable(),
    parent_category_id: yup.number()
        .nullable()
        .transform((value, originalValue) => originalValue === '' ? null : value),
});

const UpdateCategoryModal = ({category, isOpen, setIsOpen}: Props) => {
    const {t} = useTranslation()
    const {form, onSubmit, isPending} = useMutateWithForm<ICategoryRequest>({
        mutation: useUpdateCategory,
        validationSchema: validationSchema,
        initialValues: {
            name: category.name,
            icon_id: category?.icon?.id || undefined,
            type: category.type || CategoryTransactionType.EXPENSE,
            description: category.description || '',
            parent_category_id: category?.parent_category?.id
        },
        onSuccess: () => {
            setIsOpen(false)
        },
        prepareSubmitData: (values) => {
            return {
                id: category.id,
                data: values
            }
        }
    })

    const handleChangeType = (nextValue: string) => {
        const value = nextValue as CategoryTransactionType;
        form.setValue('type', value);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <div onClick={(e) => {
                    e.stopPropagation()
                }} className="p-5">
                    <DialogHeader>
                        <DialogTitle>{t('title.updateCategory')}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form id="updateCategoryForm" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col space-y-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.name')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoFocus
                                                    placeholder={t('form.placeholder.name')}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.type')}</FormLabel>
                                            <FormControl>
                                                <CategoryTransactionTypeRadio
                                                    value={field.value}
                                                    onChange={handleChangeType}
                                                    defaultValue={CategoryTransactionType.EXPENSE}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.description')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={t('form.placeholder.description')}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="icon_id"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.icon')}</FormLabel>
                                            <FormControl>
                                                <IconSelect
                                                    id="icon_id"
                                                    name="icon_id"
                                                    onChange={(iconId) => form.setValue('icon_id', iconId)}
                                                    defaultValue={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                    <DialogFooter>
                        <div className="flex gap-3 mt-5">
                            <Button isLoading={isPending} type="submit" form="updateCategoryForm">
                                {t('form.submit')}
                            </Button>
                            <DialogClose>
                                <Button variant="red">{t('button.close')}</Button>
                            </DialogClose>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateCategoryModal;