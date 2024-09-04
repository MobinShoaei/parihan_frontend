import { all } from 'redux-saga/effects'
import { StrictEffect } from '@redux-saga/types'



export default function* rootSaga(): Generator<StrictEffect> {
    yield all([])
}