import getLastFiveRecords from '../../../data_layer/getLastFiveRecords'
import { UserRecord } from '../../../types'

/*
  The function below is used to determine if a new record should be added to the database.
  
  When a round is completed, this function will be called multiple times as the TimerContext is re-rendered.
  As a result, we need to make sure that we only add a record to the database once.
  This is why we check if the last five records have the same or a very similar date as the current date.
 */

export default async (date: number): Promise<boolean> => {
  const records = await getLastFiveRecords()
  const recordsWithDuplicateDates = records.filter(
    (record: UserRecord) => record.date === (date !== 0 || date + 1 !== 0 || date - 1),
  )
  return !(recordsWithDuplicateDates.length > 0 || date === 0)
}
