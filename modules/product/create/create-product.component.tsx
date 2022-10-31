import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import { ChangeEvent } from "react";
import { ConfirmationDialog } from "../../shared/confirmation-dialog/confirmation-dialog.component";
import { IAttributeValue } from "../../shared/models/attribute-value.model";
import { productDisplayOptions } from "../../shared/models/product.model";
import {
  CATEGORY,
  COLOR,
  DESCRIPTION,
  DISCOUNTED_PRICE,
  DISPLAY,
  IMAGE,
  IMAGE_2,
  ITEM,
  NAME,
  NO,
  PRICE,
  SIZE,
  SUBMIT,
  tag,
  THUMBNAIL,
  TITLE,
  YES,
} from "../../shared/tag/tag.model";
import UploadComponent from "../../shared/upload/upload.component";
import { isValidField } from "../../shared/validator/validator";
import { IProductFilterCategory } from "../filter/product-filter.model";
import { ICreateProductState } from "./create-product.model";

interface CreateProductComponentProps {
  state: ICreateProductState;
  submitted: boolean;
  isDialogOpen: boolean;
  errors: ValidationErrors<ICreateProductState>;
  categories: IProductFilterCategory[];
  sizes: IAttributeValue[];
  colors: IAttributeValue[];
  showProductDetail(): void;
  resetForm(): void;
  submit(event: any): Promise<void>;
  change(event: ChangeEvent<HTMLInputElement>): void;
  closeDialog(): void;
}

export default function CreateProductComponent({
  state,
  submitted,
  isDialogOpen,
  errors,
  categories,
  sizes,
  colors,
  showProductDetail,
  resetForm,
  submit,
  change,
  closeDialog,
}: CreateProductComponentProps) {
  return (
    <Grid container spacing={2} component="form" noValidate>
      <Grid container item xs={12} justifyContent="center">
        <Typography component="h1" variant="h5" data-cy={TITLE}>
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
          error={isValidField(errors.name, submitted)}
          helperText={errors.name && submitted ? errors.name : null}
          data-cy={NAME}
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
          error={isValidField(errors.description, submitted)}
          helperText={
            errors.description && submitted ? errors.description : null
          }
          data-cy={DESCRIPTION}
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
          error={isValidField(errors.price, submitted)}
          helperText={errors.price && submitted ? errors.price : null}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          data-cy={PRICE}
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
          error={isValidField(errors.discountedPrice, submitted)}
          helperText={
            errors.discountedPrice && submitted ? errors.discountedPrice : null
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          data-cy={DISCOUNTED_PRICE}
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
          error={isValidField(errors.categoryId, submitted)}
          helperText={errors.categoryId && submitted ? errors.categoryId : null}
          data-cy={CATEGORY}
        >
          {categories.map((entry) => (
            <MenuItem
              key={entry.categoryId}
              value={entry.categoryId}
              data-cy={tag(ITEM, "", CATEGORY)}
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
            multiple: true,
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
          error={isValidField(errors.color, submitted)}
          helperText={errors.color && submitted ? errors.color : null}
          data-cy={COLOR}
        >
          {colors.map((entry) => (
            <MenuItem
              key={entry.attributeValueId}
              value={entry.attributeValueId}
              data-cy={tag(ITEM, "", COLOR)}
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
            multiple: true,
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
          error={isValidField(errors.size, submitted)}
          helperText={errors.size && submitted ? errors.size : null}
          data-cy={SIZE}
        >
          {sizes.map((entry) => (
            <MenuItem
              key={entry.attributeValueId}
              value={entry.attributeValueId}
              data-cy={tag(ITEM, "", SIZE)}
            >
              {entry.value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          select
          variant="outlined"
          required
          fullWidth
          size="small"
          label="Display"
          name="display"
          autoComplete="display"
          value={state.display}
          onChange={change}
          InputLabelProps={{ shrink: true }}
          error={isValidField(errors.display, submitted)}
          helperText={errors.display && submitted ? errors.display : null}
          data-cy={DISPLAY}
        >
          {productDisplayOptions.map((entry) => (
            <MenuItem
              key={entry.value}
              value={entry.value}
              data-cy={tag(ITEM, "", DISPLAY)}
            >
              {entry.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <UploadComponent
          accept="image/*"
          output={change}
          data={state.thumbnail}
          name="thumbnail"
          buttonText="Chose Thumbnail"
          testId={THUMBNAIL}
        />
      </Grid>
      <Grid item xs={12}>
        <UploadComponent
          accept="image/*"
          output={change}
          data={state.image}
          name="image"
          buttonText="Chose Image 1"
          testId={IMAGE}
        />
      </Grid>
      <Grid item xs={12}>
        <UploadComponent
          accept="image/*"
          output={change}
          data={state.image2}
          name="image2"
          buttonText="Chose Image 2"
          testId={IMAGE_2}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={submit}
          data-cy={SUBMIT}
        >
          Submit
        </Button>
      </Grid>
      <ConfirmationDialog
        content="Would you like to GO to newly added product page, or STAY to add another product?"
        confirmText="Go"
        declineText="Stay"
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
