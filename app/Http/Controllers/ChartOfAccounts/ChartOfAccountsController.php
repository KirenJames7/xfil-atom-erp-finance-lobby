<?php

namespace App\Http\Controllers\ChartOfAccounts;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ChartOfAccountsController extends Controller
{
    const CHART_OF_ACCOUNTS_JSON_NAME = "data";
    function getAllCompanyChartOfAccounts(Request $request) {
        $company_id = 1;
        $chartofaccounts = DB::select(DB::raw('SELECT ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][0] . ',' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][1] . ',' . $this->tables[ self::TBL_ACCOUNT_CATEGORY ][0] . '.' . $this->tables[ self::TBL_ACCOUNT_CATEGORY ][1][1] . ',' . $this->tables[ self::TBL_ACCOUNT_TYPE ][0] . '.' . $this->tables[ self::TBL_ACCOUNT_TYPE ][1][1] . ',' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][4] . ',' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][5] . ', main.balance FROM ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][0] .
            ' JOIN ' . $this->tables[ self::TBL_ACCOUNT_CATEGORY ][0] . ' ON ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][0] . '.' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][2] . '=' . $this->tables[ self::TBL_ACCOUNT_CATEGORY ][0] . '.' . $this->tables[ self::TBL_ACCOUNT_CATEGORY ][1][0] . 
            ' JOIN ' . $this->tables[ self::TBL_ACCOUNT_TYPE ][0] . ' ON ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][0] . '.' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][3] . '=' . $this->tables[ self::TBL_ACCOUNT_TYPE ][0] . '.' . $this->tables[ self::TBL_ACCOUNT_TYPE ][1][0] . 
            ' LEFT JOIN' .
            '((SELECT t1.' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][0] . ' AS account_grouping, SUM(totaling.balance) AS balance FROM ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][0] . ' AS t1,' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][0] . ' AS t2' .
            ' LEFT JOIN' .
            '(SELECT ' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][0] . '.' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][1][5] . ' AS posting_account, SUM(' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][0] . '.' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][1][9] . ') AS balance FROM ' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][0] .
            ' WHERE ' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][0] . '.' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][1][7] . '=' . $company_id .
            ' GROUP BY ' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][0] . '.' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][1][5] . ') totaling ON totaling.posting_account = t2.' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][0] .
            ' WHERE t2.' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][0] .
            ' BETWEEN t1.' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][4] . ' AND t1.' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][5] .
            ' GROUP BY account_grouping)' .
            ' UNION ALL' .
            '(SELECT ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][0] . ', balance FROM ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][0] .
            ' JOIN' .
            '(SELECT ' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][0] . '.' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][1][5] . ' AS posting_account, SUM(' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][0] . '.' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][1][9] . ') AS balance FROM ' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][0] .
            ' WHERE ' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][0] . '.' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][1][7] . '=' . $company_id .
            ' GROUP BY ' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][0] . '.' . $this->tables[ self::TBL_GENERAL_LEDGER_TRANSACTIONS ][1][5] . ') posting ON posting.posting_account = ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][0] . '.'. $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][0] . 
            ' WHERE ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][9] . '=' . $company_id .
            ')) AS main ON main.account_grouping = ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][0] . '.'. $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][0] .
            ' WHERE ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][9] . '=' . $company_id .
            ' ORDER BY ' . $this->tables[ self::TBL_CHART_OF_ACCOUNTS ][1][0] . ' ASC'
        ));
        return response()->json([ self::CHART_OF_ACCOUNTS_JSON_NAME => $chartofaccounts ]);
    }
}