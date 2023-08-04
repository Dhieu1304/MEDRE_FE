## I. Structure project

```js
/*
----src
-------assets
-------components
-------config
-------data
-------features
-------hooks
-------layouts
---------components
---------DefaultLayout
-------pages
---------AuthPage.js
---------AuthPage.module.scss
---------routes.js
---------index.js
-------routes
---------routes.js
---------index.js
-------services
---------authServices
---------userServices
-------store
---------AppConfigStore
---------AuthStore
-------utils
-------App.js
*/
```

# II. Hướng dẫn chia folder:
1. Thư mục public/locales:
- Chứa các folder ngôn ngữ, phiên dịch của text trong project
- Mỗi folder bên trong tương ứng với 1 ngôn ngữ
    + Tên folder là code của ngôn ngữ: Ví dụ: en, vi
    + Bên trong mỗi folder là tên các file json. Ví dụ authFeature, authPage
    ```json
    {
        "login": {
            "title": "Sign in",
            "button_title": "Login",
            "input": {
            "require_error_message": "can not empty",
            "email_format_error_message": "is wrong format",
            "password_min_length_error_message": "must be at least {{min_length}} characters",
            "password_format_error_message": "must have at least one digit and one character",
            "email_label": "Email",
            "password_label": "Password"
            }
        },
        "no_have_access": {
            "error_message": "You don't have access"
        }
        }

    ```

2. assets/images:
- Chứa các images, logo, ...
- Mỗi lần thêm image mới thì import vào index.js và export
    ```js
        import logo from "./logo.svg";
        import noAvatar from "./no-avatar.png";
        import noData from "./no-data.png";
        import authCover from "./auth-cover.png";

        const images = {
            logo,
            noAvatar,
            noData,
            authCover
        };
    ```

3. components:
- Chứa các UI dùng chung, như modal, CustomInput,...

4. config

5. features:
- Chứa các feature và gôm nhóm feature. VD: auth, doctor
- Mỗi feature có thể thuộc nhiều pages

6. hooks

7. layouts:
- Hiện tại, web chỉ có 1 layout là DefaultLayout

8. pages:
- Mỗi page chứa giao diện chung của từng pages và các route con

9. routes:

10. services

11. stores.

12. utils:
- Chứa các hàm dùng chung

# III. Quy ước chung:
- tên folder: viết thường theo camelCase: VD: store, services
- tên components và folder ứng với componets đó: Viết hoa. 
    + VD: AuthPage.js, AuthPage.module.scss


## MEDRE_FE


## Start with docker

### `docker compose up` to run