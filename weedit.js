
if (location === parent.location) {
    $('body').append('<img title="edit in webEdit" id="popin" height="16" src="//webedit.com/favicon.ico" style="cursor: pointer; position: fixed; top: 4px; right: 4px;"/>');
    $('#popin').click(event => {
        location.href = '?run=edit';
    });
} else {
    $('link[rel="icon"]').appendTo($(window.parent.document).find('head'));
}