import { takeLatest, call, put, all } from 'redux-saga/effects';
import { api } from 'utils/helpers';
import { url } from 'utils/constants';
import { logUserIn, updateUser } from 'routines';


export function* userLogIn(userInfo) {
  try {
    yield put(logUserIn.request());
    console.log({ userInfo });
    const data = yield call(api.post, url.user.main, userInfo.payload);
    yield put(logUserIn.success(data));
  } catch (error) {
    yield put(logUserIn.failure(error));
  } finally {
    yield put(logUserIn.fulfill());
  }
}

export function* userUpdate(userInfo) {
  try {
    yield put(updateUser.request());
    console.log({ userInfo });
    const data = yield call(api.put, url.user.settings, userInfo.payload);
    yield put(updateUser.success(data));
  } catch (error) {
    yield put(updateUser.failure(error));
  } finally {
    yield put(updateUser.fulfill());
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(logUserIn.TRIGGER, userLogIn),
    takeLatest(updateUser.TRIGGER, userUpdate),
  ]);
}
