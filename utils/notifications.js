import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

//key for notigication
const KEY = 'MobileFlashCards:notification';

export function clearLocalNotification () {
return AsyncStorage.removeItem(KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
        title: 'Take a quiz!',
        body: "Come and take your quiz",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(KEY)
        .then(JSON.parse)
        .then((data) => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0);
                tomorrow.setMinutes(45);

                Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                        time: tomorrow,
                        repeat: 'day',
                    }
                )

                AsyncStorage.setItem(KEY, JSON.stringify(true))
                }
            })
        }
    })
}