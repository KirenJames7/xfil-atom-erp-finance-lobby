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
import TabNav from '../../elements/TabNav.js';
import Table from '../../elements/Table.js';
import Button from '../../elements/Button.js';
import CheckBoxInline from '../../elements/CheckBoxInline.js';
import Select from '../../elements/Select.js';
import SelectLabel from '../../elements/SelectLabel.js';
import ModalForm from '../../elements/ModalForm.js';
import Label from '../../elements/Label.js';
import Required from '../../elements/Required.js';
import Input from '../../elements/Input.js';
import TextArea from '../../elements/TextArea.js';

class Journals {
    
    constructor() {
        
    }
    
    render() {
        $(document).ready(function(){
            $(document).on("click", "#journals", function(){
                $('#journals-tabs').tabs({
                    orientation: "vertical",
                    create: function(event, ui){
                        $(ui.panel).html(new Table($(ui.panel).attr('id') + '-journal', ['table', 'table-bordered', 'table-striped', 'table-hover']).render());
                        $('#' + $(ui.panel).attr('id') + '-journal').DataTable({
                            paging: false,
                            info: false,
                            scrollY: ($('.ui-tabs-nav').innerHeight() - (parseFloat($('#' + $(ui.panel).attr('id')).css('paddingTop')) * 2) - 110),
                            scrollCollapse:true,
                            responsive: true,
                            processing: true,
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
                                    className: "btn btn-raised btn-primary waves-effect waves-light",
                                    action: function() {                            
                                        $.blockUI({
                                            message: new ModalForm('purchase-order-modal', 'New Purchase Order(s)', { form_method: "POST", form_id: "purchase-order", form_enctype: "application/x-www-form-urlencoded" },
                                                [ 
                                                    new Label('purchase-request-requirement', [], [], 'Purchase Requirement' + Required ).render() + new TextArea([], 'purchase-request-requirement', { required: true, rows:10 }).render(), 
                                                    new Label('purchase-request-by', [], [], 'Purchase Requested By').render() + new Input('text', [], 'purchase-request-by', {}).render()
                                                ],
                                                [ 
                                                    new Button(['btn-raised', 'btn-warning'], 'discard', 'Discard').render(), 
                                                    new Button(['btn-raised', 'btn-secondary'], 'save', 'Save').render(), 
                                                    new Button(['btn-raised', 'btn-success'], 'send-for-approval', 'Send for Approval').render()
                                                ]).render()
                                        });
                                        //inspired by https://jsfiddle.net/u2cdfsmq/2/
                                    }
                                },
                                {
                                    text: "Approve",
                                    className: "btn btn-raised btn-info waves-effect waves-light",
                                    action: function() {
                                        console.log("Approve")
                                    }
                                },
                                {
                                    text: "Commit",
                                    className: "btn btn-raised btn-success waves-effect waves-light",
                                    action: function() {
                                        console.log("Commit")
                                    }
                                }
                            ],
                            initComplete: function() {
                                this.api().buttons().container().append(
                                    new CheckBoxInline([], {}, 'show-all', 'all', 'Show All').render() + 
                                    new CheckBoxInline([], {}, 'self', 'self', 'Created By Me').render() +
                                    new CheckBoxInline([], {}, 'evaluate', 'evaluate', 'For Approval').render()
                                );
                            }
                        });
                    }
                });

                $('#journals-tabs').on('tabsactivate', function(event, ui) {
                    $(ui.newPanel).html(new Table($(ui.newPanel).attr('id') + '-journal', ['table', 'table-bordered', 'table-striped', 'table-hover']).render());
                    $('#' + $(ui.newPanel).attr('id') + '-journal').DataTable({
                        paging: false,
                        info: false,
                        scrollY: ($('.ui-tabs-nav').innerHeight() - (parseFloat($('#' + $(ui.newPanel).attr('id')).css('paddingTop')) * 2) - 110),
                        scrollCollapse:true,
                        responsive: true,
                        processing: true,
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
                                className: "btn btn-raised btn-primary waves-effect waves-light",
                                action: function() {                            
                                    $.blockUI({
                                        message: new ModalForm('purchase-order-modal', 'New Purchase Order(s)', { form_method: "POST", form_id: "purchase-order", form_enctype: "application/x-www-form-urlencoded" },
                                            [ 
                                                new Label('purchase-request-requirement', [], [], 'Purchase Requirement' + Required ).render() + new TextArea([], 'purchase-request-requirement', { required: true, rows:10 }).render(), 
                                                new Label('purchase-request-by', [], [], 'Purchase Requested By').render() + new Input('text', [], 'purchase-request-by', {}).render()
                                            ],
                                            [ 
                                                new Button(['btn-raised', 'btn-warning'], 'discard', 'Discard').render(), 
                                                new Button(['btn-raised', 'btn-secondary'], 'save', 'Save').render(), 
                                                new Button(['btn-raised', 'btn-success'], 'send-for-approval', 'Send for Approval').render()
                                            ]).render()
                                    });
                                }
                            },
                            {
                                text: "Approve",
                                className: "btn btn-raised btn-info waves-effect waves-light",
                                action: function() {
                                    console.log("Approve")
                                }
                            },
                            {
                                text: "Commit",
                                className: "btn btn-raised btn-success waves-effect waves-light",
                                action: function() {
                                    console.log("Commit")
                                }
                            }
                        ],
                        initComplete: function() {
                            this.api().buttons().container().append(
                                new CheckBoxInline([], {}, 'show-all', 'all', 'Show All').render() + 
                                new CheckBoxInline([], {}, 'self', 'self', 'Created By Me').render() +
                                new CheckBoxInline([], {}, 'evaluate', 'evaluate', 'For Approval').render()
                            );
                        }
                    });
                });

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
                            '<h5 class="card-title text-center"> Journals </h5>' +
                            new TabNav("journals-tabs" , [ "GENERAL", "PAYMENT", "BANK", "IOU-LEND", "IOU-RTN", "IOU-SET", "RECURRING" ]).render() +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }
    
}

export default new Journals().render();