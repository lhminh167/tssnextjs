
export default function ProductReviewEditComponentTest({
    data,
    output,
    close
}: Props) {
  >
        Your Review
                    </Grid >
        <Grid
            item
            xs={12}
            sm={8}
        >
            <ThemeProvider theme={inputTheme}>
                <TextField
                    placeholder='Your review must be at least 50 characters.'
                    multiline
                    fullWidth
                    rows={4}
                    name='review1'
                    variant='outlined'
                    margin='dense'
                    value={state.review1}
                    onChange={change}
                    error={errors.review1 && submitted}
                    helperText={errors.review1 && submitted ? errors.review1 : null}
                />
            </ThemeProvider>
        </Grid>
                </Grid >
        <Grid
            item container xs={12}
            className={classes.mb}
        >
            <Grid
                item
                xs={12}
                sm={4}
                component={Typography}
            >
                Overall Rating
                    </Grid>
            <Grid
                item
                xs={12}
                sm={8}
            >
                <FormControl
                >
                    <Rating
                        name='edit-rating'
                        value={state.rating}
                        onClick={change}
                        max={5}
                    />
                    {
                        errors.rating && submitted &&
                        < FormHelperText
                            id='rating'
                        >
                            {errors.rating}
                        </FormHelperText>
                    }
                </FormControl>
            </Grid>
        </Grid>
        <Grid
            item container xs={12}
            className={classes.mb2}
        >
            <Grid
                item
                xs={12}
                sm={4}
            >
            </Grid>
            <Grid
                item
                xs={12}
                sm={8}
            >
                <Fab
                    variant='extended'
                    color='primary'
                    size='small'
                    onClick={submit}
                    className={classes.mr}
                >
                    Submit
                        </Fab>
                <Fab
                    variant='extended'
                    size='small'
                    onClick={close}
                >
                    Cancel
                        </Fab>
            </Grid>
        </Grid>
            </Grid >
        </Grid >
    );
}
