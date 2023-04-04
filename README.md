# テーブル設計

## users テーブル

| Column             | Type   | Options     |
| ------------------ | ------ | ----------- |
| email               | string | null: false, unique: true |
| encrypted_password   | string | null: false |
| name   | string | null: false |

### Association

- has_many :lounges


## lounges テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| user   | references | null: false, foreign_key: true |
| name   | string | null: false |
| attendance   | boolean | null: false |

### Association

- has_many : members
- has_many : topics
- belongs_to :user


## members テーブル

| Column  | Type       | Options                        |
| ------- | ---------- | ------------------------------ |
| lounge    | references | null: false, foreign_key: true |
| name   | string | null: false |
| attendance    | boolean | null: false |

### Association
- belongs_to :lounge


## topics テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| lounge   | references | null: false, foreign_key: true |
| name   | string | null: false |


### Association

- belongs_to :lounge