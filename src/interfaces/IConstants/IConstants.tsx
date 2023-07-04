export interface IAvatarStacked {
  img: string;
}

export interface IBaseButtonProps {
  styles: string;
  text: string;
}

export interface IButtonProps  extends IBaseButtonProps{
  onClick?: () => void;
}
export interface ILoginProps extends IBaseButtonProps {
  // Additional properties specific to Login component
  isLoggedIn?: boolean;
  username?: string;
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
    button: IButtonProps[];
  };
  icontype: {
    close: object;
    menu: object;
  };
}

export interface IBrands {
  img: string[];
}