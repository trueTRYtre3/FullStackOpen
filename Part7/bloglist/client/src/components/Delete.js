import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const Delete = ({ blog, handleDelete }) => {
  const [show, changeShow] = useState(false)

  return (
    <>
      <Button variant='danger' onClick={() => changeShow(true)}>
        Delete Blog
      </Button>

      <Modal show={show} onHide={() => changeShow(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>Remove &lsquo;{blog.title}&lsquo; by {blog.author}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => changeShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Delete