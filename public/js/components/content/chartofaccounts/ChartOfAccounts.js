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
import Label from '../../elements/Label.js';
import Required from '../../elements/Required.js';
import Input from '../../elements/Input.js';
import InputHelp from '../../elements/InputHelp.js';
import CheckBox from '../../elements/CheckBox.js';
import CheckBoxInline from '../../elements/CheckBoxInline.js';
import Radio from '../../elements/Radio.js';
import RadioInline from '../../elements/RadioInline.js';
import Button from '../../elements/Button.js';
import Table from '../../elements/Table.js';
import ModalFormCustom from '../../elements/ModalFormCustom.js';
import SelectLabel from '../../elements/SelectLabel.js'
import Select from '../../elements/Select.js'

class ChartOfAccounts {
    
    generateChartOfAccounts() {
        $(document).ready(function() {
            $(document).on("click", "#chartofaccounts", function() {

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

                let chartofaccounts = $('#chart-of-accounts').DataTable({
                    paging: false,
                    info: false,
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    ajax: "/chartofaccounts",
                    columns: [
                        { title: "#", data: "account_number" },
                        { title: "Account Name", data: "account_name" },
                        { title: "Category", data: "account_category" },
                        { title: "Type", data: "account_type" },
                        { title: "Begin Total", data: "totalling_begin" },
                        { title: "End Total", data: "totalling_end" },
                        { title: "Balance", data: "balance" }
                    ],
                    dom: "Bfrtip",
                    buttons: [
                        {
                            text: "New",
                            className: "btn btn-raised btn-primary waves-effect waves-light",
                            action: function() {
                                $.blockUI({
                                    message: new ModalFormCustom("new-ledger-account-modal", "New G/L Account", { form_method: "POST", form_id: "new-ledger-account", form_enctype: "application/x-www-form-urlencoded" },
                                        '<div class="row">' +
                                            '<div class="col-md-4">' +
                                                '<div class="form-group">' +
                                                    new Label("account-number", [], [], "Account Number" + Required).render() + new Input("text", [], "Account Number", { required: true }).render() +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="row">' +
                                            '<div class="col-md-8">' +
                                                '<div class="form-group">' +
                                                    new Label("account-name", [], [], "Account Name" + Required).render() + new Input("text", [], "Account Name", { required: true }).render() +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="row justify-content-around">' +
                                            '<div class="col-md-4">' +
                                                '<div class="form-group">' +
                                                    new CheckBox([], {}, "account-direct-posting", true, "Direct Posting").render() +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-4">' +
                                                '<div class="form-group">' +
                                                    new CheckBox([], {}, "account-reconciliation", true, "Reconciliation").render() +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="row">' +
                                            '<div class="col-md-4">' +
                                                '<div>' +
                                                    new SelectLabel("Account Category" + Required).render() + '<br />' +
                                                    new Select([ "account-category" ], "account-category", { required: true }, { 0: "Please Select", 1: "Balance Sheet", 2: "Income Statement" }, 0).render() +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="row">' +
                                            '<div class="col-md-4">' +
                                                '<div>' +
                                                    new SelectLabel("Account Type" + Required).render() + '<br />' +
                                                    new Select([ "account-type" ], "account-type", { required: true }, { 0: "Please Select", 1: "Begin Total", 2: "End Total", 3: "Posting" }, 0).render() +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-4">' +
                                                '<div>' +
                                                    new SelectLabel("Begin Total").render() + '<br />' +
                                                    new Select([ "begin-total" ], "begin-total", {}, { 0: "Please Select", 1: 1000000000, 2: 1100000000, 3: 1200000000 }, 0).render() +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-4">' +
                                                '<div>' +
                                                    new SelectLabel("End Total").render() + '<br />' +
                                                    new Select([ "end-total" ], "end-total", {}, { 0: "Please Select", 1: 1999999999, 2: 2999999999, 3: 3999999999 }, 0).render() +
                                                '</div>' +
                                            '</div>' +
                                        '</div>'
                                    ,
                                    [
                                        new Button(['btn-raised', 'btn-warning'], 'discard', 'Discard').render(),
                                        new Button(['btn-raised', 'btn-success'], 'save', 'Create').render()
                                    ]).render()
                                });
                                $('select').SumoSelect();
                                $('select.begin-total')[0].sumo.disable();
                                $('select.end-total')[0].sumo.disable();
                                $('.select-label').css({
                                    marginLeft: "0px"
                                });
                            }
                        },
                        {
                            text: "Delete",
                            className: "btn btn-raised btn-danger waves-effect waves-light",
                            action: function() {
                                if (selectedrow.gl_account) {
                                    swaltext.innerHTML = "Are you sure you want to DELETE G/L Account:<br /><b>" + selectedrow.gl_account[0] + "</b><br /><b>WARNING!</b><br />In proceeding G/L Account # will be Deleted";
                                    swal({
                                        title: "Delete?",
                                        content: swaltext,
                                        icon: "error",
                                        dangerMode: true,
                                        closeOnClickOutside: false,
                                        closeOnEsc: false,
                                        buttons: {
                                            cancel: {
                                                text: "Nope! Not " + selectedrow.gl_account[0] ,
                                                visible: true
                                            },
                                            confirm: {
                                                text: "Extend"
                                            }
                                        }
                                    })
//                                            .then((deleteIt)=>{
//                                                if (deleteIt) {
//
//                                                }
//                                            });
                                } else {
                                    nothingSelectedSWAL();
                                }
                            }
                        }
                    ],
                    initComplete: function() {

                    }
                });

                $(document).on('change', "select.account-type", function() {
                    console.log($(this).val())
                    if ($(this).val() === "End Total") {
                        $('select.begin-total')[0].sumo.enable();
                        $('select.end-total')[0].sumo.enable();
                    } else {
                        $('select.begin-total')[0].sumo.disable();
                        $('select.end-total')[0].sumo.disable();
                    }
                });

                chartofaccounts.on('click', 'tr', function(){
                    if (!$(this).hasClass("selected")) {
                        chartofaccounts.$('tr.selected').removeClass("selected");
                        $(this).addClass("selected");
                        selectedrow.gl_account = chartofaccounts.row(this).data();
                    }
                });

                chartofaccounts.on('dblclick', 'tr', function() {
                    selectedrow.gl_account = chartofaccounts.row(this).data();
                    $.blockUI({
                        message: new ModalFormCustom("view-ledger-account-modal", "View G/L Account", { form_method: "POST", form_id: "view-ledger-account", form_enctype: "application/x-www-form-urlencoded" },
                            '<div class="row">' +
                                '<div class="col-md-4">' +
                                    '<div class="form-group">' +
                                        new Label("account-number", [], [], "Account Number" + Required).render() + new Input("text", [], "Account Number", { required: true }).render() +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="row">' +
                                '<div class="col-md-8">' +
                                    '<div class="form-group">' +
                                        new Label("account-name", [], [], "Account Name" + Required).render() + new Input("text", [], "Account Name", { required: true }).render() +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="row justify-content-around">' +
                                '<div class="col-md-4">' +
                                    '<div class="form-group">' +
                                        new CheckBox([], {}, "account-direct-posting", true, "Direct Posting").render() +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-md-4">' +
                                    '<div class="form-group">' +
                                        new CheckBox([], {}, "account-reconciliation", true, "Reconciliation").render() +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="row">' +
                                '<div class="col-md-4">' +
                                    '<div>' +
                                        new SelectLabel("Account Category" + Required).render() + '<br />' +
                                        new Select([ "account-category" ], "account-category", { required: true }, { 0: "Please Select", 1: "Balance Sheet", 2: "Income Statement" }, 0).render() +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="row">' +
                                '<div class="col-md-4">' +
                                    '<div>' +
                                        new SelectLabel("Account Type" + Required).render() + '<br />' +
                                        new Select([ "account-type" ], "account-type", { required: true }, { 0: "Please Select", 1: "Begin Total", 2: "End Total", 3: "Posting" }, 0).render() +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-md-4">' +
                                    '<div>' +
                                        new SelectLabel("Begin Total").render() + '<br />' +
                                        new Select([ "begin-total" ], "begin-total", {}, { 0: "Please Select", 1: 1000000000, 2: 1100000000, 3: 1200000000 }, 0).render() +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-md-4">' +
                                    '<div>' +
                                        new SelectLabel("End Total").render() + '<br />' +
                                        new Select([ "end-total" ], "end-total", {}, { 0: "Please Select", 1: 1999999999, 2: 2999999999, 3: 3999999999 }, 0).render() +
                                    '</div>' +
                                '</div>' +
                            '</div>'
                        ,
                        [
                            new Button(['btn-raised', 'btn-warning'], 'discard', 'Discard').render(),
                            new Button(['btn-raised', 'btn-success'], 'save', 'Save').render()
                        ]).render()
                    });
                    $('select').SumoSelect();
                    $('select.begin-total')[0].sumo.disable();
                    $('select.end-total')[0].sumo.disable();
                    $('.select-label').css({
                        marginLeft: "0px"
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
    }
    
    render() {
        this.generateChartOfAccounts();
        return (
            '<div class="row">' +
                '<div class="col-12">' +
                    '<div class="card">' +
                        '<div class="card-body chart-of-accounts">' +
                            '<h5 class="card-title text-center">Chart Of Accounts</h5>' +
                            new Table('chart-of-accounts', ['table', 'table-bordered', 'table-striped', 'table-hover']).render() +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }
}

export default new ChartOfAccounts().render();