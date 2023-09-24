## Taskerpone
<sub>Just like the cheese Mascarpone<sub>

### Simple task management app

#### The steps to run the app locally


* Clone the repository by;
  * git clone git@github.com:kuzeykoca/taskerpone.git
* Run the commands below;
  * composer install
  * npm i
* Setup database and environment file
* Migrate the tables

#### Voila

* On two different terminal window
* Run these codes in each window
  * npm run dev
  * php artisan serve


### Features

* Create/Update/Delete a new project
* Projects window shows the projects paginated and 30 project per page, 
* When you navigated to a certain project by just clicking to open button on the Project Label Box
* The Project has tasks and they are also paginated, 30 per page.
* Tasks can be Created/Updated/Deleted in the project window.
* Tasks can be dragged and dropped in certain importance/priority columns

### DB Relation
#### User > Project > Task

### Model properties

* User has
  * name, email
* Project has
  * name
* Task has
  * name, info, priority
