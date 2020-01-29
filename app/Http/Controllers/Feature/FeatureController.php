<?php

namespace App\Http\Controllers\Feature;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class FeatureController extends Controller
{
    protected $features;

    public function getFeatures(Request $request) {
        $this->features = DB::table($this->tables[self::TBL_FEATURE][0])->where( $this->tables[ self::TBL_FEATURE ][0].".".$this->tables[ self::TBL_FEATURE ][1][4], $request->company )->get();
        return response()->json([ 'features' => $this->features ]);
    }
}
