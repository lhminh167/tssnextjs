import { Button, Grid, InputAdornment, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../root/root.model";
import { upload } from "../../shared/crud/crud.service";
import { toNumber } from "../../shared/helpers/auth.helper";
import { IAttributeValue } from "../../shared/models/attribute-value.model";
import UploadComponent from "../../shared/upload/upload.component";
import { IProductFilterCategory, ProductFilterFilterEnum } from "../filter/product-filter.model";
import { EditProductRequestValidator, defaultEditProductState, IEditProductRequest, IEditProductState } from "./edit-product.model";
import { UploadRequest, ImageRenameRequest } from "../../shared/crud/crud.model";
import { isValidForm } from "../../shared/validator/validator";
import { editProduct, renameImages } from "./edit-product.service";
import { toUrl } from "../../shared/helpers/string.helper";
import { ConfirmationDialog } from "../../shared/confirmation-dialog/confirmation-dialog.component";
import { useRouter } from "next/router";
import { IProduct } from "../../shared/models/product.model";


const useStyles = makeStyles(theme => ({
    input: {
        display: 'none'
    }
}));

interface Props {
    data: IProduct;
}

export default function EditProductComponent({
    data
}: Props) {
    const classes = useStyles({});
    const router = useRouter();
    const [state, setState] = useState<IEditProductState>({
        ...defaultEditProductState,
        productId: data.productId,
        name: data.name,
        description: data.description,
        price: data.price.toString(),
        discountedPrice: data.discountedPrice.toString(),
        image: window ? new File([''], data.image) : null,
        image2: window ? new File([''], data.image2) : null,
        thumbnail: window ? new File([''], data.thumbnail) : null,
        display: data.display.toString(),
        size: data.attributes.filter(a => a.name === 'Size').map(a => a.attributeValueId),
        color: data.attributes.filter(a => a.name === 'Color').map(a => a.attributeValueId),
        categoryId: data.category.categoryId

    });
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    let errors: any = {};

    const colors = useSelector<IRootState, IAttributeValue[]>(
        state => state.productFilter.filter ?.data ?.attributes.filter(a => a.attributeId === ProductFilterFilterEnum.Color)
    );
    const sizes = useSelector<IRootState, IAttributeValue[]>(
        state => state.productFilter.filter ?.data ?.attributes.filter(a => a.attributeId === ProductFilterFilterEnum.Size)
    );
    const categories = useSelector<IRootState, IProductFilterCategory[]>(
        state => state.productFilter.filter ?.data ?.categories
    );

    function change(event) {
        
        const target = event.target;
        const name = target.name;
        let value: any = target.value;
        const type = target.type;

        if (type === 'file') value = target.files[0];

        setState({
            ...state,
            [name]: value,
        });
    }

    async function submit(event) {

        const dataToSubmit: IEditProductRequest = {
            productId: state.productId,
            name: state.name,
            description: state.description,
            price: toNumber(state.price),
            discountedPrice: toNumber(state.discountedPrice),
            categoryId: state.categoryId,
            attributes: [...state.color, ...state.size],
            display: toNumber(state.display),
            thumbnail: toUrl(state.name) + '-thumbnail',
            image: toUrl(state.name),
            image2: toUrl(state.name) + '-2',
        };
        setSubmitted(true);
        errors = new EditProductRequestValidator().validate(dataToSubmit);
        
        if (!isValidForm(errors)) return;
        try {
            
            // await renameImage(dataToSubmit)
            await updateImages(dataToSubmit);
            const response = await editProduct(dataToSubmit);
            setIsDialogOpen(true);
        } catch (e) {
        }
    }

    // async function renameImage(input: IEditProductRequest) {
    //     
    //     if (state.name === data.name) return;
    //     const images: ImageRenameRequest[] = [
    //         { oldName: data.thumbnail, newName: data.thumbnail },
    //         { oldName: data.image, newName: data.image },
    //         { oldName: data.image2, newName: input.image2 },
    //     ];
    //     await renameImages(images);
    // }

    async function updateImages(input: IEditProductRequest) {
        

        const images: UploadRequest[] = [
            { name: input.thumbnail, file: state.thumbnail },
            { name: input.image, file: state.image },
            { name: input.image2, file: state.image2 },
        ].filter(i => i ?.file ?.size);

        if (!images.length) return;

        await upload(images);
    }

    function closeDialog() {
        setIsDialogOpen(false);
    }

    function showProductDetail() {
        router.push({
            pathname: '/product/[productName]',
            query: {
                productId: state.productId
            }
        },
            `/product/${toUrl(state.name)}?productId=${state.productId}`
        );
    }

    function resetForm() {
        setState(defaultEditProductState);
        closeDialog();
    }

    return (
        <Grid container spacing={2}
            component="form"
            noValidate
        >
            <Grid
                container
                item
                xs={12}
                justify="center"

            >
                <Typography
                    component="h1"
                    variant="h5"

                >
                    Add New Product
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={state.name}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.name && submitted}
                    helperText={errors.name && submitted ? errors.name : null}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    multiline
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    value={state.description}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.description && submitted}
                    helperText={errors.description && submitted ? errors.description : null}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    label="Price"
                    name="price"
                    autoComplete="price"
                    value={state.price}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.price && submitted}
                    helperText={errors.price && submitted ? errors.price : null}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    label="Discounted Price"
                    name="discountedPrice"
                    autoComplete="discountedPrice"
                    value={state.discountedPrice}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.discountedPrice && submitted}
                    helperText={errors.discountedPrice && submitted ? errors.discountedPrice : null}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    select
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    label="Category"
                    name="categoryId"
                    autoComplete="categoryId"
                    value={state.categoryId}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.categoryId && submitted}
                    helperText={errors.categoryId && submitted ? errors.categoryId : null}
                >
                    {categories.map(entry => (
                        <MenuItem key={entry.categoryId} value={entry.categoryId}>
                            {entry.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    select
                    SelectProps={{
                        multiple: true
                    }}
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    label="Color"
                    name="color"
                    autoComplete="color"
                    value={state.color}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.color && submitted}
                    helperText={errors.color && submitted ? errors.color : null}
                >
                    {colors.map(entry => (
                        <MenuItem key={entry.attributeValueId} value={entry.attributeValueId}>
                            {entry.value}
                        </MenuItem>
                    ))}
                </TextField>

            </Grid>
            <Grid item xs={12}>
                <TextField
                    select
                    SelectProps={{
                        multiple: true
                    }}
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    label="Size"
                    name="size"
                    autoComplete="size"
                    value={state.size}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.size && submitted}
                    helperText={errors.size && submitted ? errors.size : null}
                >
                    {sizes.map(entry => (
                        <MenuItem key={entry.attributeValueId} value={entry.attributeValueId}>
                            {entry.value}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <UploadComponent
                    accept="image/*"
                    output={change}
                    data={state.thumbnail}
                    name='thumbnail'
                    buttonText='Chose Thumbnail'
                />
            </Grid>
            <Grid item xs={12}>
                <UploadComponent
                    accept="image/*"
                    output={change}
                    data={state.image}
                    name='image'
                    buttonText='Chose Image 1'
                />
            </Grid>
            <Grid item xs={12}>
                <UploadComponent
                    accept="image/*"
                    output={change}
                    data={state.image2}
                    name='image2'
                    buttonText='Chose Image 2'
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={submit}
                >
                    Submit
                </Button>
            </Grid>
            <ConfirmationDialog
                content='Would you like to GO to newly edited product page, or STAY to edit another product?'
                confirmText='Go'
                declineText='Stay'
                open={isDialogOpen}
                close={closeDialog}
                confirm={showProductDetail}
                decline={closeDialog}
            ></ConfirmationDialog>
        </Grid>
    );
}
