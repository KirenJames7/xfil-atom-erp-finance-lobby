<?php

namespace App\Http\Controllers\LDAPAuth\User;

use Illuminate\Http\Request;
use App\Http\Controllers\LDAPAuth\LDAPAuthController;
use Illuminate\Support\Facades\DB;

class UserController extends LDAPAuthController
{
    protected $filter;
    protected $attributes;
    protected $results;
    protected $session_data;
    protected $user_id;
    const CURRENT_USER = "current_user";
    const CURRENT_USER_ID = "current_user_id";
    const CURRENT_USER_COMPANY = "current_user_company";
    
    public function setUserSession($session_data) {
        session([
            self::CURRENT_USER => $session_data[0]["displayname"][0]
        ]);
        return;
    }
    
    public function getUserAttributes($username) {
        $this->filter = "(&(samAccountName=$username))";
        $this->attributes = array("sAMAccountName", "displayName", "mail");
        $this->result = ldap_search($this->ldap_connect, $this->ldap_config['basedn'], $this->filter, $this->attributes);
        $this->setUserSession(ldap_get_entries($this->ldap_connect, $this->result));
        return;
    }
    
    public function userAuthentication($request) {
        $this->ldapConnect();
        $this->ldapBind($request->username, $request->password);
        if ( $this->bind ) {
            $this->getUserAttributes($request->username);
            return response()->json([ "authenticated" => $this->bind, "session" => [ self::CURRENT_USER => session(self::CURRENT_USER), self::CURRENT_USER_ID => $this->user_id, self::CURRENT_USER_COMPANY => $request->company ] ]);
        } else {
            return response()->json([ "authenticated" => $this->bind ]);
        }
    }
    
    public function userAuthorization($request) {
        if ( DB::table( $this->tables[ self::TBL_USER ][0] )->where( [ [ $this->tables[ self::TBL_USER ][1][1], $request->username ], [ $this->tables[ self::TBL_USER ][1][2], 1 ], [ $this->tables[ self::TBL_USER ][1][5], $request->company ] ] )->exists() ) {
            $this->user_id = DB::table( $this->tables[ self::TBL_USER ][0] )->where( [ [ $this->tables[ self::TBL_USER ][1][1], $request->username ], [ $this->tables[ self::TBL_USER ][1][5], $request->company ] ] )->value( $this->tables[ self::TBL_USER ][0].".".$this->tables[ self::TBL_USER ][1][0] );
            return $this->userAuthentication($request);
        } else {
            return response()->json([ "unauthorized" => true ]);
        }
    }
    
    public function userSignIn(Request $request) {
        return $this->userAuthorization($request);
    }
    
    public function userUnauthenticate() {
        session()->flush();
        if (empty(session()->all())) {
            return response()->json([ "unauthenticated" => true ]);
        }
    }
    
    public function userSignOut() {
        return $this->userUnauthenticate();
    }
    
    public function userSessionActiveCheck() {
        if ( session()->has(self::CURRENT_USER) ) {
            return response()->json(true);
        } else {
            return response()->json(false);
        }
    }
}