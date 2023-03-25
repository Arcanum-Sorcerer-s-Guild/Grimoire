# MSL

## Database
- Entries
  > id (PK)  
  > user_id (FK users)  
  >  title  
  > description  
  > created  
  > updated  

- Entry_tag (Many to many [Entries to tags])
  > id (PK)  
  > tag_id (FK tags)  
  > entry_id (FK entries)  

- Tags
  > id  
  > name  

- Users
  > id  
  > username  

- Templates
  > id (PK)  
  > name  
  > JSON OBJECT  
---
<br>

## Server
<br>

### POST TEMPLATES - POST /TEMPLATES
    {
      title : title
      description : desc
      tags : [{name: "ex tag1", name: "ex tag2", ...}]
    }

### RETRIEVE ENTRIES - GET /ENTRIES
    FROM FRONT END SEARCH_PARAMS
    (QUERY PARAMS)
      ?user=str&title=str&desc=str&start=str&end=str&tag=str&tag=str....

     SELECT * FROM ENTRIES WHERE (
       user_id
       (stretch FUZZY) [ title , description ]
       created between [start_date , end_date]
     ) 
     INNER JOIN ( tags_entries on tag_ID)
     INNER JOIN ( tags on tag_id)

### ADD USER - POST /USERS
    FROM FRONT END
    {
      username : username
    }
    INSERT INTO users


### ADD ENTRY - POST /ENTRIES
    (STRETCH SESSION COOKIE VALIDATION)
    FROM FRONT END SEARCH_PARAMS
      {
        user_id : user_id
        title : title
        desc : desc
        tags : [tags]
      }

    IF TAGS(
      INSERT INTO tags  (name ) ON CONFLICT DO NOTHING

      INSERT INTO entry_tag (
        tag_id
        entry_id )
    ) )

### PUT ENTRY - PATCH /ENTRIES
    app.put("/home/:id", (req,res) => {
      knex("entries")
        .where("id",req.params.id)
        .update(req.body)
        })

    JSON SENT
    {
      "title" : "title"
      "description" : "New Description"
      "tags" : [updated tag list]
    }

    IF TAGS(
      INSERT INTO tags  (name ) ON CONFLICT DO NOTHING

      INSERT INTO entry_tag (
        tag_id
        entry_id )
    ) )

### DELETE ENTRY - DELETE /ENTRIES
    (STRETCH AUTHENTICATION)
    app.delete("/home/:id, (req,res) => {
      knex("entries")
        .where("id",req.params.id)
        .del()
        .then(() => {
          res.status(204)
        })
    })



### ALL /*
    Status(404)
---
<br>


## Client
<br>

### LOGIN PAGE - localhost://CLIENT PORT/LOGIN
    (STRETCH Authenticate?)

    GET req.body
    {
      username : username
    }

    Cookie
    {
      session_id : session_id
      ...?
    }

### HOME PAGE - localhost://CLIENT PORT/HOME

#### ADD ENTRY  
    POST REQ.BODY
    {
      user_id : user_id
      title : title
      description : description
      tags: [tags]
    }
  <br>

#### VIEW ENTRIES
    GET REQ.BODY
      {
        user_id : user_id
        title : title
        desc : desc
        start_date : start_date
        end_data : end date
        tags : [tags]
      }

#### DELETE ENTRIES
    If admin?

    DELETE REQ.PARAMS.ID
    {
      entry_id: req.params.id
    }

#### UPDATE ENTRIES
    localhost://CLIENT PORT/:ID
    PATCH REQ.PARAMS.ID

    {
      entry_id : req.params.id
      desc: new_desc
    }


---
<br>



