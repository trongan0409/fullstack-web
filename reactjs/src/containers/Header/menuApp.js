export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user-redux',
        menus: [
            // {
            //     name: 'menu.admin.manage-user', link: '/system/manage-user',
            //     // subMenus: [
            //     //     { name: 'menu.system.system-administrator.manage-user', link: '/system/manage-user' },
            //     //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
            //     //     { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
            //     // ]
            // },
            {
                name: 'menu.admin.manage-user-redux', link: '/system/manage-user-redux',
            },
        ]
    },
    { //quản lý sản phẩm
        name: 'menu.admin.manage-product',
        menus: [
            {
                name: 'menu.admin.manage-product', link: '/system/manage-product',
            },
        ]
    },
    { //quản lý đơn hàng
        name: 'menu.admin.manage-order',
        menus: [
            {
                name: 'menu.admin.manage-order', link: '/system/manage-order',
            },
        ]
    },
    { //quản lý bài viết
        name: 'menu.admin.manage-posts',
        menus: [
            {
                name: 'menu.admin.manage-posts', link: '/system/manage-posts',
            },
        ]
    },
    { //quản lý bình luận
        name: 'menu.admin.manage-comment',
        menus: [
            {
                name: 'menu.admin.manage-comment', link: '/system/manage-comment',
            }
        ]
    },
];