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

let data = [
    [ "LKR", "Sri Lankan Rupee" ],
    [ "USD", "US Dollar" ],
    [ "GBP", "British Pound" ],
    [ "EUR", "Euro" ]
];

let exchange = [
    [ "USD", 175.94 ],
    [ "GBP", 228.65 ],
    [ "EUR", 192.94 ]
];

let history = [
    [ "2019-04-10", "USD", 175.94 ],
    [ "2019-04-10", "GBP", 228.65 ],
    [ "2019-04-10", "EUR", 192.94 ],
    [ "2019-04-11", "USD", 175.94 ],
    [ "2019-04-11", "GBP", 228.65 ],
    [ "2019-04-11", "EUR", 192.94 ],
    [ "2019-04-12", "USD", 175.94 ],
    [ "2019-04-12", "GBP", 228.65 ],
    [ "2019-04-12", "EUR", 192.94 ],
    [ "2019-04-13", "USD", 175.94 ],
    [ "2019-04-13", "GBP", 228.65 ],
    [ "2019-04-13", "EUR", 192.94 ]
];

class CurrencyExchange {
    
    constructor() {
        
    }
    
    render() {
        $(document).ready(function() {
            $(document).on("click", "#currencyexchange", function() {
                let currencies = $('#currencies').DataTable({
                    paging: false,
                    info: false,
                    data: data,
                    scrollY: 225,
                    scrollCollapse:true,
                    processing: true,
                    responsive: true,
                    columns: [
                        { title: "Currency Code" },
                        { title: "Currency Name" }
                    ],
                    dom: "Bfrtip",
                    buttons: [
                        {
                            text: "Add",
                            className: "btn btn-raised btn-primary",
                            action: function() {

                            }
                        }
                    ]
                });

                let dailyexchange = $('#daily-exchange').DataTable({
                    paging: false,
                    info: false,
                    data: exchange,
                    scrollY: 225,
                    scrollCollapse:true,
                    processing: true,
                    responsive: true,
                    columns: [
                        { title: "Currency" },
                        { title: "Exhange Rate" }
                    ]
                });

                let exchangerates = $('#exchange-rates').DataTable({
                    paging: false,
                    info: false,
                    data: history,
                    scrollY: 225,
                    scrollCollapse:true,
                    processing: true,
                    responsive: true,
                    columns: [
                        { title: "Date" },
                        { title: "Currency" },
                        { title: "Exhange Rate" }
                    ]
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
                '<div class="col-4">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title text-center"> Currencies </h5>' +
                            new Table("currencies", [ "table", "table-bordered", "table-striped", "table-hover" ]).render() +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-4">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title text-center"> Today\'s Rates </h5>' +
                            new Table('daily-exchange', ['table', 'table-bordered', 'table-striped', 'table-hover']).render() +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-4">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title text-center"> Exchange Rate History </h5>' +
                            new Table('exchange-rates', ['table', 'table-bordered', 'table-striped', 'table-hover']).render() +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="row">' +
                '<div class="col-12">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title text-center"> Currency Histogram </h5>' +
                            new Table('warehouse-information', ['table', 'table-bordered', 'table-striped', 'table-hover']).render() +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }
    
}

export default new CurrencyExchange().render();