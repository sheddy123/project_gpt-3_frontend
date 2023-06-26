export interface IAvatarStacked {
  img: string;
}

export interface IButtonProps {
  styles: string;
  text: string;
}

export interface IHeaderProps {
  h1_header_text: string;
  p_header_text: string;
  img: string;
  avatarStackedData: IAvatarStacked[];
  button: IButtonProps;
}

export interface INavLinks {
  text: string[];
  nav_auth: {
    text: string;
    button: IButtonProps;
  };
  icontype: {
    close: object;
    menu: object;
  };
}

export interface IBrands {
  img: string[];
}