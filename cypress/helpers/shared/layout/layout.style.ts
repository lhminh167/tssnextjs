import { CreateCSSProperties } from '@material-ui/core/styles/withStyles'
import theme, { themeColor } from './layout.theme'

export const w100: CreateCSSProperties<{}> = {
    width: '100%'
}

export const h100: CreateCSSProperties<{}> = {
    height: '100%'
}

export const p: CreateCSSProperties<{}> = {
    padding: theme.spacing(2)
}

export const pt: CreateCSSProperties<{}> = {
    paddingTop: theme.spacing(2)
}

export const pt2: CreateCSSProperties<{}> = {
    paddingTop: theme.spacing(4)
}

export const m: CreateCSSProperties<{}> = {
    margin: theme.spacing(2)
}

export const mr: CreateCSSProperties<{}> = {
    marginRight: theme.spacing(2)
}

export const mt: CreateCSSProperties<{}> = {
    marginTop: theme.spacing(2)
}

export const mb: CreateCSSProperties<{}> = {
    marginBottom: theme.spacing(2)
}

export const mb2: CreateCSSProperties<{}> = {
    marginBottom: theme.spacing(4)
}

export const bold: CreateCSSProperties<{}> = {
    fontWeight: 'bold'
}

export const bgGrey: CreateCSSProperties<{}> = {
    background: themeColor.lightGrey
}

export const pl0: CreateCSSProperties<{}> = {
    paddingLeft: 0
}

export const pr0: CreateCSSProperties<{}> = {
    paddingRight: 0
}

export const mlAuto: CreateCSSProperties<{}> = {
    marginLeft: 'auto'
}

export const mrAuto: CreateCSSProperties<{}> = {
    marginRight: 'auto'
}

export const mtAuto: CreateCSSProperties<{}> = {
    marginTop: 'auto'
}

export const bgWhite: CreateCSSProperties<{}> = {
    backgroundColor: themeColor.white
}

export const bgPrimary: CreateCSSProperties<{}> = {
    backgroundColor: themeColor.primary
}

export const textSuccess: CreateCSSProperties<{}> = {
    color: theme.palette.success.main
}

export const textDanger: CreateCSSProperties<{}> = {
    color: theme.palette.error.main
}

export const textWarning: CreateCSSProperties<{}> = {
    color: theme.palette.warning.main
}