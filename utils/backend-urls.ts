export const BackendUrls: { [name: string]: string } = {
    //account
    login: '/login/',
    org_user: '/account/org_user/',
    register: '/account/user/register/',
    verify_code: '/account/user/verify_code/',
    create_project: '/account/user/project_register/',
    check_username: '/account/user/check_username/',
    send_forgot_password_code: '/account/send_forgot_password_code/',
    verify_forgot_password_code: '/account/verify_forgot_password_code/',
    change_password: "/account/change_password/",

    //api
    refresh_token: '/api/token/refresh/',

    //main
    project: '/main/project/',
    faq: '/main/faq/',
    call: '/main/call/',
    create_file_message: '/chat/messages/create_file_message/',
    plans: '/main/plan/',
    get_plan: '/main/project/plan/',
    time_duration: '/main/plan_duration/',
    call_comment: '/main/call/comment/',
    import_excel: '/main/project/import_excel/',
    tag: '/main/tag/',
    faq_order: '/main/faq/order/',
    tag_order: '/main/tag/order/',
    main_omment: '/main/comment/',
    notification: '/main/notification/',
    contact: "/main/contact/",

    //file
    recordingfile: '/main/call/recordingfile/',

    //form
    form: '/form/',
    form_contents: '/form/contents/',
    form_answer: '/form/contents/answer/',
    update_record: '/form/contents/update_record/',
    comment: '/form/contents/comment/',
    export: '/form/contents/get_excel_url/',
    prev_record: '/form/contents/get_previous_record/',
    next_record: '/form/contents/get_next_record/',
    bulk_update_record: '/form/contents/bulk_update_record/',
    form_comment: '/form/comment/',
    form_field: '/form/field/',
    form_field_order: '/form/field/order/',
    tag_by_list: '/form/contents/tag_by_list/',
    update_tag: '/form/contents/update_tag_record/',
    //report
    chart_report: '/main/call/chart_report/',
    contents_chart_report: '/form/contents/chart_report/',
};
