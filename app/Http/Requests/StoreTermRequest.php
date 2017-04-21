<?php
namespace App\Http\Requests;
use Dingo\Api\Http\FormRequest;
use Request;
class StoreTermRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'title'              => 'required|unique:terms,title',
            'description'=>'required'
        ];
        //when editing
        if(Request::isMethod('put')){
            $rules = [
                'title'=>'required',
                'description'=>'required',
                'country_id'=>'required'
            ];
        }

        return $rules;

    }
}