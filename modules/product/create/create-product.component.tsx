import { Button, Grid, InputAdornment, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../root/root.model';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { UploadRequest } from '../../shared/crud/crud.model';
import { upload } from '../../shared/crud/crud.service';
import { toNumber, goTo } from '../../shared/helpers/auth.helper';
import { toUrl } from '../../shared/helpers/string.helper';
import { IAttributeValue } from '../../shared/models/attribute-value.model';
import { productDisplayOptions, defaultProduct } from '../../shared/models/product.model';
import UploadComponent from '../../shared/upload/upload.component';
import { isValidForm } from '../../shared/validator/validator';
import { IProductFilterCategory, ProductFilterFilterEnum, productUrl } from '../filter/product-filter.model';
import productFilterSlice from '../filter/product-filter.slice';
import { CreateProductStateValidator, defaultCreateProductState, ICreateProductRequest, ICreateProductState } from './create-product.model';
import { createProduct } from './create-product.service';
import { DESCRIPTION, COLOR, SIZE, YES, NAME, PRICE, DISCOUNTED_PRICE, SUBMIT, NO, CATEGORY, THUMBNAIL, IMAGE, DISPLAY, IMAGE_2, getOptionTag, TITLE } from '../../shared/tag/tag.model';


const useStyles = makeStyles(theme => ({
    input: {
        display: 'none'
    }
}));

export default function CreateProductComponent() {
    const classes = useStyles({});
    const [state, setState] = useState<ICreateProductState>(defaultCreateProductState);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [productId, setProductId] = useState<number>(0);
    let errors = new CreateProductStateValidator().validate(state);;
    const colors = useSelector<IRootState, IAttributeValue[]>(
        state => state.productFilter.filter?.data?.attributes.filter(a => a.name === ProductFilterFilterEnum.Color)
    );
    const sizes = useSelector<IRootState, IAttributeValue[]>(
        state => state.productFilter.filter?.data?.attributes.filter(a => a.name === ProductFilterFilterEnum.Size)
    );
    const categories = useSelector<IRootState, IProductFilterCategory[]>(
        state => state.productFilter.filter?.data?.categories
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (!categories.length)
            dispatch(productFilterSlice.actions.getFilterPending());
    }, []);

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
        setSubmitted(true);
        if (!isValidForm(errors)) return;

        const images: UploadRequest[] = [
            { name: toUrl(state.name) + '-thumbnail', file: state.thumbnail },
            { name: toUrl(state.name), file: state.image },
            { name: toUrl(state.name) + '-2', file: state.image2 },
        ];
        const data: ICreateProductRequest = {
            name: state.name.trim(),
            description: state.description.trim(),
            price: toNumber(state.price),
            discountedPrice: toNumber(state.discountedPrice),
            categoryId: toNumber(state.categoryId),
            attributes: [...state.color, ...state.size].map(x => toNumber(x)),
            display: toNumber(state.display),
            thumbnail: images[0].name,
            image: images[1].name,
            image2: images[2].name,
        };

        await upload(images);
        const response = await createProduct(data);

        setProductId(response.content.productId);
        setIsDialogOpen(true);
    }

    function closeDialog() {
        setIsDialogOpen(false);
    }

    function showProductDetail() {
        goTo(productUrl.detail({
            ...defaultProduct,
            name: state.name,
            productId: productId
        }).as);
    }

    function resetForm() {
        setState(defaultCreateProductState);
        closeDialog();
    }

    return (
        <Grid container spacing={2}
            component='form'
            noValidate
        >
            <Grid
                container
                item
                xs={12}
                justify='center'

            >
                <Typography
                    component='h1'
                    variant='h5'
                    data-cy={TITLE}
                >
                    Add New Product
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant='outlined'
                    required
                    fullWidth
                    size='small'
                    label='Name'
                    name='name'
                    autoComplete='name'
                    value={state.name}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.name && submitted}
                    helperText={errors.name && submitted ? errors.name : null}
                    data-cy={NAME}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    multiline
                    variant='outlined'
                    required
                    fullWidth
                    size='small'
                    label='Description'
                    name='description'
                    autoComplete='description'
                    value={state.description}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.description && submitted}
                    helperText={errors.description && submitted ? errors.description : null}
                    data-cy={DESCRIPTION}

                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant='outlined'
                    required
                    fullWidth
                    size='small'
                    label='Price'
                    name='price'
                    autoComplete='price'
                    value={state.price}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.price && submitted}
                    helperText={errors.price && submitted ? errors.price : null}
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    data-cy={PRICE}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant='outlined'
                    required
                    fullWidth
                    size='small'
                    label='Discounted Price'
                    name='discountedPrice'
                    autoComplete='discountedPrice'
                    value={state.discountedPrice}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.discountedPrice && submitted}
                    helperText={errors.discountedPrice && submitted ? errors.discountedPrice : null}
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    data-cy={DISCOUNTED_PRICE}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    select
                    variant='outlined'
                    required
                    fullWidth
                    size='small'
                    label='Category'
                    name='categoryId'
                    autoComplete='categoryId'
                    value={state.categoryId}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.categoryId && submitted}
                    helperText={errors.categoryId && submitted ? errors.categoryId : null}
                    data-cy={CATEGORY}

                >
                    {categories.map(entry => (
                        <MenuItem key={entry.categoryId} value={entry.categoryId}
                            data-cy={getOptionTag(CATEGORY)}
                        >
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
                    variant='outlined'
                    required
                    fullWidth
                    size='small'
                    label='Color'
                    name='color'
                    autoComplete='color'
                    value={state.color}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.color && submitted}
                    helperText={errors.color && submitted ? errors.color : null}
                    data-cy={COLOR}
                >
                    {colors.map(entry => (
                        <MenuItem key={entry.attributeValueId} value={entry.attributeValueId}
                            data-cy={getOptionTag(COLOR)}
                        >
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
                    variant='outlined'
                    required
                    fullWidth
                    size='small'
                    label='Size'
                    name='size'
                    autoComplete='size'
                    value={state.size}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.size && submitted}
                    helperText={errors.size && submitted ? errors.size : null}
                    data-cy={SIZE}
                >
                    {sizes.map(entry => (
                        <MenuItem key={entry.attributeValueId} value={entry.attributeValueId}
                            data-cy={getOptionTag(SIZE)}
                        >
                            {entry.value}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    select
                    variant='outlined'
                    required
                    fullWidth
                    size='small'
                    label='Display'
                    name='display'
                    autoComplete='display'
                    value={state.display}
                    onChange={change}
                    InputLabelProps={{ shrink: true }}
                    error={errors.display && submitted}
                    helperText={errors.display && submitted ? errors.display : null}
                    data-cy={DISPLAY}
                >
                    {productDisplayOptions.map(entry => (
                        <MenuItem key={entry.value} value={entry.value}
                            data-cy={getOptionTag(DISPLAY)}
                        >
                            {entry.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <UploadComponent
                    accept='image/*'
                    output={change}
                    data={state.thumbnail}
                    name='thumbnail'
                    buttonText='Chose Thumbnail'
                    testId={THUMBNAIL}
                />
            </Grid>
            <Grid item xs={12}>
                <UploadComponent
                    accept='image/*'
                    output={change}
                    data={state.image}
                    name='image'
                    buttonText='Chose Image 1'
                    testId={IMAGE}
                />
            </Grid>
            <Grid item xs={12}>
                <UploadComponent
                    accept='image/*'
                    output={change}
                    data={state.image2}
                    name='image2'
                    buttonText='Chose Image 2'
                    testId={IMAGE_2}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={submit}
                    data-cy={SUBMIT}
                >
                    Submit
                </Button>
            </Grid>
            <ConfirmationDialog
                content='Would you like to GO to newly added product page, or STAY to add another product?'
                confirmText='Go'
                declineText='Stay'
                open={isDialogOpen}
                close={closeDialog}
                confirm={showProductDetail}
                decline={resetForm}
                confirmTestId={YES}
                declineTestId={NO}
            ></ConfirmationDialog>
        </Grid>
    );
}
