/**
 * Entidade de Domínio: Theme
 * Configuração visual de um tenant
 */
export class Theme {
    id: string;
    tenantId: string;
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryDark: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    gradientStart: string;
    gradientMid: string;
    gradientEnd: string;

    constructor(
        id: string,
        tenantId: string,
        primary: string,
        primaryHover: string,
        secondary: string,
        secondaryDark: string,
        surface: string,
        text: string,
        textMuted: string,
        border: string,
        gradientStart: string,
        gradientMid: string,
        gradientEnd: string
    ) {
        this.id = id;
        this.tenantId = tenantId;
        this.primary = primary;
        this.primaryHover = primaryHover;
        this.secondary = secondary;
        this.secondaryDark = secondaryDark;
        this.surface = surface;
        this.text = text;
        this.textMuted = textMuted;
        this.border = border;
        this.gradientStart = gradientStart;
        this.gradientMid = gradientMid;
        this.gradientEnd = gradientEnd;
    }
}
