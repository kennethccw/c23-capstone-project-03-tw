[ ] setup database (knex)
  [ ] migrate
  [ ] seed

[ ] users
  [ ] backend
    [ ] register
      [ ] register controller
        [ ] form
          [ ] photo (formidable)
          [ ] username
          [ ] email
          [ ] password
          [ ] mobile
          [ ] gender (options)
          [ ] is experienced (checkbox)
      [ ] register service
      [ ] register route


    [ ] profile
      [ ] profile controller
        [ ] form
          [ ] photo (formidable)
          [ ] username
          [ ] email
          [ ] password
          [ ] mobile
          [ ] gender (options)
          [ ] is experienced (checkbox)
      [ ] profile service
      [ ] profile route


    [ ] auth controller
      [ ] google login
      [ ] facebook login
      [ ] username / email login
        [ ] form
          [ ] username / email
          [ ] password
      [ ] logout
    [ ] auth service
    [ ] auth route
      [ ] /login/google
      [ ] /login/facebook
      [ ] /login
      [ ] /logout

[ ] activities
  [ ] backend
    - user
    [ ] get all activities
    [ ] get activities by type
      [ ] editor's choice
      [ ] urgent
      [ ] popular
    [ ] post application
      [ ] form
        [ ] fullname
        [ ] mobile (fetch from database)
        [ ] email (fetch from database)
    [ ] get applictaion status
    [ ] del application (cancell)

[ ] advertiser
  [ ] backend
    [ ] get advertiser one by one
      [ ] record click
      [ ] record watch

[ ] donation
  [ ] backend
    [ ] post donation
      [ ] form
        [ ] receipt name
        [ ] receipt email
        [ ] receipt mobile
        [ ] payment method
        [ ] donation method
          [ ] fps ac
          [ ] payme qr code
        [ ] accept edm
      [ ] add to donation amount per year
      [ ] auto email??? (backend / front end)
  
...