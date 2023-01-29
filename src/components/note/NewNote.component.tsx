import React, {FC} from 'react';
import {Container, TContainer} from "../container/container.component";
import {NoteForm} from "../note-form/NoteForm.component";

export const NewNote: FC = () => {
    return (
        <Container type={TContainer.wrapper}>
            <h1>Create new note</h1>
            <NoteForm></NoteForm>
        </Container>
    );
};

