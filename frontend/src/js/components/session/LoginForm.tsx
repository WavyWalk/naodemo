import React, {useMemo} from "react"
import {PrimaryModal} from "../modal/PrimaryModal"
import {RouterNavigationUtils} from "../../utils/routing/RouterNavigationUtils"
import {LoginFormState} from "../../states/LoginFormState"
import {User} from "../../models/User"
import {Account} from "../../models/Account"
import {PlainInput} from "../formelements/PlainInput"
import {Button, Form} from "reactstrap"
import {AccountValidations} from "../../models/validations/AccountValidations"

const LoginForm: React.FC = () => {

    const formState = useMemo(
        ()=>new LoginFormState(new User({account: new Account()})),
        []
    ).use()

    const account = formState.model.account!
    const errors = formState.model.getErrorsFor('general')

    return <PrimaryModal
        isOpen={true}
        onClose={()=>RouterNavigationUtils.history.goBack()}
    >
        <PlainInput formState={formState}
                    model={account}
                    label="E-Mail"
                    property="email"
                    validate={AccountValidations.validateEmail}
        />
        <PlainInput formState={formState}
                    model={account}
                    type={'password'}
                    label="Passwort"
                    property="password"
                    validate={AccountValidations.validatePassword}
        />
        {errors?.map((it)=>{
            return <div className="isInvalid">
                {it}
            </div>
        })}
        <Button
            onClick={()=>{
                formState.login()
            }}
        >
            Login
        </Button>
    </PrimaryModal>

}

export  {LoginForm}