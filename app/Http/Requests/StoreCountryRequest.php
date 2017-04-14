<?php
namespace App\Http\Requests;
use Dingo\Api\Http\FormRequest;
use Request;
class StoreCountryRequest extends FormRequest
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
            'title'              => 'required|unique:countries'
        ];
        //when editing
        if(Request::isMethod('put')){
            $rules = [
                'title'=>'required'
            ];
        }

        return $rules;

    }
}