/* 
 * Copyright (C) 2019 kirenj
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */
import Table from '../../elements/Table.js';
import Form from '../../elements/Form.js';
import FormEnd from '../../elements/FormEnd.js';
import Button from '../../elements/Button.js';
import Required from '../../elements/Required.js';
import Label from '../../elements/Label.js';
import Input from '../../elements/Input.js';
import InputHelp from '../../elements/InputHelp.js';
import SelectLabel from '../../elements/SelectLabel.js';
import Select from '../../elements/Select.js';
import ModalFormCustom from '../../elements/ModalFormCustom.js';

let data = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ]
];

class Company {
    
    constructor() {
        
    }
    
    render() {
        $(document).ready(function() {
                
            $(document).on("click", "#company", function() {
              
                let selectedrow = {};
                let swaltext = document.createElement('p');

                function nothingSelectedSWAL() {
                    swal({
                        title: "Nothing Selected!",
                        text: "Please select a record to proceed.",
                        icon: "info",
                        closeOnClickOutside: false,
                        closeOnEsc: false,
                        buttons: {
                            confirm: {
                                text: "OK"
                            }
                        }
                    });
                }

                let siteinfo = $('#site-info').DataTable({
                    paging: false,
                    info: false,
                    data: data,
                    scrollY: 100,
                    scrollCollapse:true,
                    processing: true,
                    responsive: true,
                    columns: [
                        { title: "Name" },
                        { title: "Position" },
                        { title: "Location" },
                        { title: "Code" },
                        { title: "Date" },
                        { title: "Salary", className: "text-right" }
                    ],
                    dom: "Bfrtip",
                    buttons: [
                        {
                            text: "New",
                            className: "btn btn-raised btn-primary",
                            action: function() {
                                $.blockUI({
                                    message: new ModalFormCustom("new-site-modal", "New Site", { form_method: "POST", form_id: "new-site", form_enctype: "application/x-www-form-urlencoded" },
                                    [
                                        '<div class="row">' +
                                            '<div class="col">' +
                                                '<div class="form-group">' +
                                                    new Label("site-code", [], [], "Site Code" + Required).render() +
                                                    new Input("text", [ "col-md-3" ], "site-code", { required: true }).render() +
                                                    new InputHelp("Ex: ZONE-NW").render() +
                                                '</div>' +
                                                '<div class="form-group">' +
                                                    new Label("site-name", [], [], "Site Name" + Required).render() +
                                                    new Input("text", [ "col-md-6" ], "site-name", { required: true }).render() +
                                                    new InputHelp("Ex: Zone24x7 - Nawala").render() +
                                                    new InputHelp("Name describing the site code").render() +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="row">' +
                                            '<div class="col-md-6">' +
                                                '<div class="form-group">' +
                                                    new Label("site-po-box", [], [], "PO Box" + Required).render() +
                                                    new Input("text", [ "col-md-8" ], "site-po-box", { required: true }).render() +
                                                '</div>' +
                                                '<div class="form-group">' +
                                                    new Label("site-address-line-1", [], [], "Address Line 1" + Required).render() +
                                                    new Input("text", [], "site-address-line-1", { required: true }).render() +
                                                '</div>' +
                                                '<div class="form-group">' +
                                                    new Label("site-address-line-2", [], [], "Address Line 2").render() +
                                                    new Input("text", [], "site-address-line-2", {}).render() +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-6">' +
                                                '<div>' +
                                                    new SelectLabel("City" + Required).render() + '<br />' +
                                                    new Select([ "site-city" ], "site-city", { required: true }, { 0: "Please Select", 1: "Koswatta", 2: "Colombo 1", 3: "Colombo 4" }, 0).render() +
                                                '</div>' +
                                                '<div class="form-group">' +
                                                    new Label("province-state", [], [], "Province / State" + Required).render() +
                                                    new Input("text", [ "col-md-8" ], "state-province", { required: true }).render() +
                                                '</div>' +
                                                '<div class="form-group">' +
                                                    new Label("country", [], [], "Country"+ Required).render() +
                                                    new Input("text", [ "col-md-8" ], "country", { required: true }).render() +
                                                '</div>' +
                                            '</div>' +
                                        '</div>'
                                    ],
                                    [
                                        new Button([ "btn-raised", "btn-warning" ], "discard", "Discard").render(),
                                        new Button([ "btn-raised", "btn-success" ], "save", "Create").render()
                                    ]).render()
                                });
                                $('select').SumoSelect();
                                $('.select-label').css({
                                    marginLeft: "0px",
                                    paddingTop: "14px"
                                });
                            }
                        }
                    ]
                });

                let warehouseinfo = $('#warehouse-info').DataTable({
                    paging: false,
                    info: false,
                    scrollY: 100,
                    scrollCollapse:true,
                    processing: true,
                    responsive: true,
                    columns: [
                        { title: "Name" },
                        { title: "Position" },
                        { title: "Location" },
                        { title: "Code" },
                        { title: "Date" },
                        { title: "Salary", className: "text-right" }
                    ],
                    dom: "Bfrtip",
                    buttons: [
                        {
                            text: "New",
                            className: "btn btn-raised btn-primary",
                            action: function() {
                                $.blockUI({
                                    message: new ModalFormCustom("new-warehouse-modal", "New Warehouse", { form_method: "POST", form_id: "new-warehouse", form_enctype: "application/x-www-form-urlencoded" },
                                    [
                                        '<div class="row">' +
                                            '<div class="col">' +
                                                '<div class="form-group">' +
                                                    new Label("warehouse-code", [], [], "Warehouse Code" + Required).render() +
                                                    new Input("text", [ "col-md-3" ], "warehouse-code", { required: true }).render() +
                                                    new InputHelp("If Site ZONE-NW").render() +
                                                    new InputHelp("Ex: ZONE-NW-WH").render() +
                                                '</div>' +
                                                '<div class="form-group">' +
                                                    new Label("warehouse-name", [], [], "Warehouse Name" + Required).render() +
                                                    new Input("text", [ "col-md-6" ], "warehouse-name", { required: true }).render() +
                                                    new InputHelp("Ex: Zone24x7 - Nawala Warehouse").render() +
                                                    new InputHelp("Name describing the warehouse code").render() +
                                                '</div>' +
                                            '</div>' +
                                        '</div>'
                                    ],
                                    [
                                        new Button([ "btn-raised", "btn-warning" ], "discard", "Discard").render(),
                                        new Button([ "btn-raised", "btn-success" ], "save", "Create").render()
                                    ]).render()
                                });
                                $('select').SumoSelect();
                                $('.select-label').css({
                                    marginLeft: "0px",
                                    paddingTop: "14px"
                                });
                            }
                        }
                    ],
                    drawCallback: function() {                                
                        if (this.api().data().any()) {
                            this.api().buttons().enable();
                        } else {
                            this.api().buttons().disable();
                        }
                    }
                });

                $('#company-business-reg-no').val("PV 3716");
                $('#company-name').val("Zone24x7 (Private) Limited");
                $('#company-po-box').val("460");
                $('#company-address-line-1').val("Nawala Road");
                $('select').SumoSelect();
                $('select.company-city')[0].sumo.selectItem("Koswatta");
                $('#company-province-state').val("Western Province");
                $('#company-country').val("Sri Lanka");
                $('select.company-base-currency')[0].sumo.selectItem("LKR");
                $('.select-label').css({
                    marginLeft: "0px",
                    paddingTop: "17px"
                });
                
                $('form#company-info input').each((index, element) => {
                    if ($('#' + $(element).attr("id")).val()) {
                        $('#' + $(element).attr("id")).parents(".form-group").addClass("is-filled");
                    }
                });
                
                $('#edit-company-info').on('click', function() {
                    //swal verification
                    $('input[id!="company-business-reg-no"][id!="company-name"]').each(function() {
                        $(this).removeAttr("disabled");
                    });
                    $('select').each(function() {
                       $(this)[0].sumo.enable();
                    });
                    $('#company-info').append('<div class="row border-top"><div class="col text-right">' + new Button([ "btn-raised", "btn-warning", "btn-lg" ], "cancel-company-info", "Cancel").render() + '&nbsp' + new Button([ "btn-raised", "btn-success", "btn-lg" ], "save-company-info", "Save").render() + '</div></div>');
                    $(this).attr('disabled', true);

                    $('#cancel-company-info').on('click', function() {
                        //swal verification
                        $('input').each(function() {
                            $(this).attr("disabled", true);
                        });
                        $('select').each(function() {
                           $(this)[0].sumo.disable();
                        });
                        $('#company-info .row').last().remove();
                        $('#edit-company-info').removeAttr("disabled");
                    });

                    $('#save-company-info').on('click', function() {
                        //swal verification
                        $('input').each(function() {
                            $(this).attr("disabled", true);
                        });
                        $('select').each(function() {
                           $(this)[0].sumo.disable();
                        });
                        $('#company-info .row').last().remove();
                        $('#edit-company-info').removeAttr("disabled");
                    });
                });

                siteinfo.on('click', 'tr', function(){
                    if (!$(this).hasClass("selected")) {
                        siteinfo.$('tr.selected').removeClass("selected");
                        $(this).addClass("selected");
                        selectedrow.site_info = siteinfo.row(this).data();
                    }
                    //add activate deactivate button
                });

                siteinfo.on('dblclick', 'tr', function() {
                    selectedrow.site_info = siteinfo.row(this).data();
                    $.blockUI({
                        message: new ModalFormCustom("edit-site-modal", "Edit Site", { form_method: "POST", form_id: "edit-site", form_enctype: "application/x-www-form-urlencoded" },
                        [
                            '<div class="row">' +
                                '<div class="col">' +
                                    '<div class="form-group">' +
                                        new Label("site-code", [], [], "Site Code" + Required).render() +
                                        new Input("text", [ "col-md-3" ], "site-code", { required: true }).render() +
                                        new InputHelp("Ex: ZONE-NW").render() +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        new Label("site-name", [], [], "Site Name" + Required).render() +
                                        new Input("text", [ "col-md-6" ], "site-name", { required: true }).render() +
                                        new InputHelp("Ex: Zone24x7 - Nawala").render() +
                                        new InputHelp("Name describing the site code").render() +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="row">' +
                                '<div class="col-md-6">' +
                                    '<div class="form-group">' +
                                        new Label("site-po-box", [], [], "PO Box" + Required).render() +
                                        new Input("text", [ "col-md-8" ], "site-po-box", { required: true }).render() +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        new Label("site-address-line-1", [], [], "Address Line 1" + Required).render() +
                                        new Input("text", [], "site-address-line-1", { required: true }).render() +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        new Label("site-address-line-2", [], [], "Address Line 2").render() +
                                        new Input("text", [], "site-address-line-2", {}).render() +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-md-6">' +
                                    '<div>' +
                                        new SelectLabel("City" + Required).render() + '<br />' +
                                        new Select([ "site-city" ], "site-city", { required: true }, { 0: "Please Select", 1: "Koswatta", 2: "Colombo 1", 3: "Colombo 4" }, 0).render() +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        new Label("province-state", [], [], "Province / State" + Required).render() +
                                        new Input("text", [ "col-md-8" ], "state-province", { required: true }).render() +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        new Label("country", [], [], "Country"+ Required).render() +
                                        new Input("text", [ "col-md-8" ], "country", { required: true }).render() +
                                    '</div>' +
                                '</div>' +
                            '</div>'
                        ],
                        [
                            new Button([ "btn-raised", "btn-warning" ], "discard", "Discard").render(),
                            new Button([ "btn-raised", "btn-success" ], "save", "Create").render()
                        ]).render()
                    });
                    $('select').SumoSelect();
                    $('.select-label').css({
                        marginLeft: "0px",
                        paddingTop: "14px"
                    });
                });

                $(document).on('click', '#discard', function() {
                    $.unblockUI();
                    document.body.style.overflowY = "auto";
                });

                //fixing a bug with datatables scrollY when on firefox
                if (Browser.name === "firefox") {
                    $('div.dataTables_scrollBody').css('padding-right', "6px");
                }
                //fixing bug with datatable search
                $('input[type="search"]').addClass("form-control");
                //remove the data table button styling
                $('.dt-button').removeClass("dt-button");

            });
                
        });
        return(
            '<div class="row">' +
                '<div class="col-12">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title text-center"> Company Information </h5>' +
                            new Form({ form_method: "POST", form_id: "company-info", form_enctype: "" }).render() +
                                '<div class="row border-bottom">' +
                                    '<div class="col">' +
                                        new Button([ "btn-raised", "btn-warning", "btn-lg" ], "edit-company-info", "Edit").render() +
                                    '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                    '<div class="col-md-6">' +
                                        '<div class="form-group">' +
                                            new Label("company-business-reg-no", [], [], "Business Reg. No" + Required).render() +
                                            new Input("text", ["col-md-4"], "company-business-reg-no", { required: true, disabled: true }).render() +
                                            new InputHelp("Number found on the BR certificate.").render() +
                                            new InputHelp("This will be used on reports.").render() +
                                        '</div>' +
                                        '<div class="form-group">' +
                                            new Label("company-name", [], [], "Company Name" + Required).render() +
                                            new Input("text", [], "company-name", { required: true, disabled: true }).render() +
                                            new InputHelp("The long name of the company.").render() +
                                            new InputHelp("This will be used on reports.").render() +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                    '<div class="col-md-3">' +
                                        '<div class="form-group">' +
                                            new Label("company-po-box", [], [], "PO Box" + Required).render() +
                                            new Input("text", ["col-md-6"], "company-po-box", { required: true, disabled: true }).render() +
                                            new InputHelp("Current PO Box number.").render() +
                                        '</div>' +
                                        '<div class="form-group">' +
                                            new Label("company-address-line-1", [], [], "Address Line 1" + Required).render() +
                                            new Input("text", [], "company-address-line-1", { required: true, disabled: true  }).render() +
                                            new InputHelp("Ex: The street name").render() +
                                        '</div>' +
                                        '<div class="form-group">' +
                                            new Label("company-address-line-2", [], [], "Address Line 2").render() +
                                            new Input("text", [], "company-address-line-2", { disabled: true }).render() +
                                            new InputHelp("Ex: Another street name").render() +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-md-3">' +
                                        '<div>' +
                                            new SelectLabel("City" + Required).render() + '<br />' +
                                            new Select([ "company-city" ], "company-city", { required: true, disabled: true }, { 0: "Please Select", 1: "Koswatta", 2: "Colombo 1", 3: "Colombo 4" }, 0).render() +
                                        '</div>' +
                                        '<div class="form-group">' +
                                            new Label("company-province-state", [], [], "Province / State" + Required).render() +
                                            new Input("text", [], "company-province-state", { required: true, disabled: true }).render() +
                                        '</div>' +
                                        '<div class="form-group">' +
                                            new Label("company-country", [], [], "Country" + Required).render() +
                                            new Input("text", [], "company-country", { required: true, disabled: true  }).render() +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-md-3">' +
                                        '<div>' +
                                            new SelectLabel("Base Currency" + Required).render() + '<br />' +
                                            new Select([ "company-base-currency" ], "company-base-currency", { required: true, disabled: true  }, { 0: "Please Select", 1: "LKR", 2: "USD", 3: "GBP" }, 0).render() +
                                        '</div>' +
                                        '<div>' +
                                            new SelectLabel("Secondary Currency").render() + '<br />' +
                                            new Select([ "company-secondary-currency" ], "company-secondary-currency", { disabled: true }, { 0: "Please Select", 1: "LKR", 2: "USD", 3: "GBP" }, 0).render() +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-md-3">' +
                                        '<div class="form-group">' +
                                            new Label("company-vat", [], [], "VAT No").render() +
                                            new Input("text", [], "company-vat", { disabled: true }).render() +
                                        '</div>' +
                                        '<div class="form-group">' +
                                            new Label("company-svat", [], [], "SVAT No").render() +
                                            new Input("text", [], "company-svat", { disabled: true }).render() +
                                        '</div>' +
                                        '<div class="form-group">' +
                                            new Label("company-iso", [], [], "ISO No").render() +
                                            new Input("text", [], "company-iso", { disabled: true }).render() +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            FormEnd +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="row">' +
                '<div class="col-12">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title text-center"> Site Information </h5>' +
                            new Table('site-info', ['table', 'table-bordered', 'table-striped', 'table-hover']).render() +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="row">' +
                '<div class="col-12">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title text-center"> Warehouse Information </h5>' +
                            new Table('warehouse-info', ['table', 'table-bordered', 'table-striped', 'table-hover']).render() +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }
    
}

export default new Company().render();