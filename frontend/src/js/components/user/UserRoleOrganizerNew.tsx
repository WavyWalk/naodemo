import React, {useMemo} from "react"
import { PrimaryModal } from "../modal/PrimaryModal"
import { RouterNavigationUtils } from "../../utils/routing/RouterNavigationUtils"
import {Card, Container, Col, Row, Form, Button} from "reactstrap"
import {UserRegisterOrganiserFormState} from "../../states/UserRegisterOrganiserFormState"
import {User} from "../../models/User"
import {Account} from "../../models/Account"
import {PlainInput} from "../formelements/PlainInput"
import {RadioGroup} from "../formelements/RadioGroup"
import {ISelectPair} from "../formelements/ISelectPair"
import {asKeyOf} from "../../libs/typeutils/asKeyOf"
import {DropdownSelect} from "../formelements/DropdownSelect"
import {SingleCheckbox} from "../formelements/SingleCheckBox"

export const salutationSelectOptions: ISelectPair[] = [
    {
        value: 'Frau',
        readableName: 'Frau'
    },
    {
        value: 'Herr',
        readableName: 'Herr'
    }
]

export const titleSelectPairs: ISelectPair[] = [
    {
        value: 'Dr.',
        readableName: 'Dr.'
    },
    {
        value: 'Prof. Dr.',
        readableName: 'Prof. Dr.'
    },
    {
        value: 'Apotheker',
        readableName: 'Apotheker'
    },
]

const UserRoleOrganizerNew: React.FC<{open: boolean}> = ({open}) => {

    const formState = useMemo(()=>{
        return new UserRegisterOrganiserFormState(new User({account: new Account}))
    }, []).use()

    const user = formState.model
    const account = formState.model.account

    return <PrimaryModal isOpen={open} onClose={()=>{
        RouterNavigationUtils.history.goBack()
    }}>
        <Container>
            <Row className="register-form">
                <Form onSubmit={(e)=>{e.preventDefault();e.stopPropagation()}}>
                    <RadioGroup
                        formState={formState}
                        model={user}
                        selectPairs={salutationSelectOptions}
                        label="Anrede"
                        property={asKeyOf<User>('salutation')}
                        validate={formState.validateSalutation}
                    />
                    <DropdownSelect formState={formState}
                        model={user}
                        selectPairs={titleSelectPairs}
                        label="Ihr Titel"
                        property="title"
                    />
                    <PlainInput formState={formState}
                                model={user}
                                label="Vorname"
                                property="firstName"
                                validate={formState.validateFirstName}
                    />
                    <PlainInput formState={formState}
                                model={user}
                                label="Nachname"
                                property="lastName"
                                validate={formState.validateLastName}
                    />
                    <PlainInput formState={formState}
                                model={account}
                                label="E-Mail"
                                property="email"
                                validate={formState.validateEmail}
                    />
                    <PlainInput formState={formState}
                                model={account}
                                type={'password'}
                                label="Passwort"
                                property="password"
                                validate={formState.validatePassword}
                    />
                    <SingleCheckbox valueOnCheck={true}
                                    valueOnUncheck={false}
                                    formState={formState}
                                    model={user}
                                    label="I accept tos"
                                    property={asKeyOf<User>('tosAccepted')}
                                    validate={formState.validateTosAccepted}
                    />
                    <SingleCheckbox valueOnCheck={true}
                                    valueOnUncheck={false}
                                    formState={formState}
                                    model={user}
                                    label="I subscribe to newsletter"
                                    property={asKeyOf<User>('newsletterAccepted')}
                                    validate={formState.validateTosAccepted}
                    />
                    {user.getErrorsFor('general')?.map((it)=>{
                        return <p>{it}</p>
                    })}
                    <Button
                        onClick={()=>{
                            formState.submit()
                        }}
                    >
                        Registrieren
                    </Button>
                </Form>
            </Row>
        </Container>
    </PrimaryModal>

}

export {UserRoleOrganizerNew}